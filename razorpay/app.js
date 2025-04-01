const express=require("express");
const app=express();
const IndexRouter=require("./routes/index");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",IndexRouter);
app.listen(3000);



/*
Razorpay is primarily used for payment processing. It provides businesses with a platform to accept, process, and 
disburse payments online through various methods such as credit cards, debit cards, UPI, and net banking. Razorpay 
simplifies the payment experience for both merchants and customers, offering tools for managing transactions and 
handling payment- related tasks. The other options-database management, API development, and frontend design-do not 
accurately describe Razorpay's main functionality.

To authenticate API requests to Razorpay, you need an API Key and Secret. These credentials allow your application to 
securely communicate with Razorpay's servers and perform actions like creating orders, capturing payments, and processing 
refunds. The other options (username and password, client ID and secret, access token and refresh token) are typically used 
in different authentication scenarios but are not applicable for Razorpay's API authentication.


In Razorpay, an Order is an important concept used to track and manage payments. It represents a payment attempt for 
a specific transaction and provides an identifier for tracking the payment lifecycle.

Payment Tracking: When a customer initiates a payment, an order is created in Razorpay's system. The order ID is then 
used to track the payment status, such as whether it is successful, failed, or pending.

Pre-Authorization: Razorpay allows you to create an order before the payment is initiated. This helps ensure the 
transaction details (like amount, currency, etc.) are properly recorded before a customer is directed to the payment gateway.

Multiple Payment Attempts: Razorpay orders allow multiple payment attempts for the same order. For example, if a 
customer's payment fails initially, they can retry using the same order.

Linking Payments: Every payment made by a customer is linked to an order. This helps keep all attempts to pay for a
particular purchase under one order, allowing you to track retries, failures, and successful payments easily.

Amount Management: The order keeps track of the total amount due for a transaction. If the customer makes a partial
payment or the payment fails, this information is maintained against the order ID.


As of now, Cryptocurrency is NOT a valid payment method supported by Razorpay. Razorpay primarily supports traditional 
payment methods such as Credit Cards, UPI (Unified Payments Interface), and Net Banking, among others. While 
cryptocurrency is gaining popularity as a payment method, it is not widely accepted by all payment gateways, 
including Razorpay, for standard transactions. The other options (Credit Card, UPI, and Net Banking) are commonly 
used and supported payment methods within Razorpay's platform


When creating an order using the Razorpay API, the currency parameter is mandatory. This parameter specifies the currency 
in which the payment will be made (eg, INR, USD), ensuring that the transaction is processed correctly. While the 
other parameters like receipt, notes, and callback_url can be useful for additional context or functionality, they 
are not required for order creation in the APL

In Razorpay, amounts must be specified in the smallest unit of the currency (eg, paise for INR, cents for USD). 
This ensures precise payment processing without any discrepancies due to decimal values.
# Razorpay Payment Integration with Express.js

This guide will help you set up Razorpay payment integration with Express.js. It includes creating orders, handling 
payments, verifying payments, and saving payment details in MongoDB.

## Prerequisites
1. Node.js installed
2. MongoDB installed and running
3. Razorpay account (for API keys)
## Setup
### 1. Install Razorpay  ->  npm install razorpay
### 2. Create an Instance to Access Resources from Razorpay API
In your `index.js` file, create an instance of Razorpay:
```js
require('dotenv').config();
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```

### 3. Setup MongoDB Connection
Connect to MongoDB:
```js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
```
### 4. Define the Payment Schema
First, define the Payment schema using Mongoose. Create a new file called `models/Payment.js`:

```js
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  signature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
}, { timestamps: true });
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
```


### 5. Import the Payment Model in `index.js`
Import the Payment model in your `index.js` file:
```js
const Payment = require('../models/Payment');
```
### 6. Create a Checkout Page
Create an HTML file `index.html` for your frontend:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Razorpay Integration</title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
  <h1>Razorpay Integration</h1>
  <p>Welcome to Razorpay Integration</p>
  <button id="rzp-button1">Pay with Razorpay</button>
</body>
</html>
```
### 7. Make a POST Route for URL = '/create/orderId' on `index.js`
In your `index.js` file, create a POST route to create an order:
```js
router.post('/create/orderId', async (req, res) => {
  const options = {
    amount: 5000 * 100, // amount in smallest currency unit
    currency: "INR",
  };
  try {
    const order = await razorpay.orders.create(options);
    res.send(order);

    const newPayment = await Payment.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'pending',
    });

  } catch (error) {
    res.status(500).send('Error creating order');
  }
});
```
### 8. Add Axios CDN on Checkout Page
Ensure the Axios and Jquery CDN is added in the `index.html` file (already included in step 4):
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
### 9. Generate Order Code in Checkout Page Inside Script Tags
Add the AJAX request to generate the order inside the `<script>` tags in `index.html`:
```html
<script>
document.getElementById('rzp-button1').onclick = function(e) {
  axios.post('/create/orderId')
    .then(function (response) {
      var options = {
        "key": "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
        "amount": response.data.amount, // Amount in currency subunits. Default currency is INR.
        "currency": response.data.currency,
        "name": "YOUR_COMPANY_NAME",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": response.data.id, 
        "handler": function(response) {
          axios.post('/api/payment/verify', {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature
          })
          .then(function (response) {
            alert('Payment verified successfully');
          })
          .catch(function (error) {
            console.error(error);
          });
        },
        "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function(response) {
        alert('Payment Failed');
        alert('Error Code: ' + response.error.code);
        alert('Description: ' + response.error.description);
        alert('Source: ' + response.error.source);
        alert('Step: ' + response.error.step);
        alert('Reason: ' + response.error.reason);
        alert('Order ID: ' + response.error.metadata.order_id);
        alert('Payment ID: ' + response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    })
    .catch(function (error) {
      console.error(error);
    });
};
</script>
```
### 10. Create POST Route for '/api/payment/verify' and Verify Payment Signature
In your `index.js` file, create a POST route to verify the payment signature:
```js
router.post('/api/payment/verify', async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET
  try {
    const { validatePaymentVerification } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js')
    const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
    if (result) {
      const payment = await Payment.findOne({ orderId: razorpayOrderId });
      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = 'completed';
      await payment.save();
      res.json({ status: 'success' });
    } else {
      res.status(400).send('Invalid signature');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error verifying payment');
  }
});
```
*/