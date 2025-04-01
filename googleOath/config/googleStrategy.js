const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google OAuth strategy setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you could look up the user in your database using the profile information
      console.log(profile);
      done(null, profile);
    }
  )
);

// Serialize user to store data in session (usually only user ID is stored)
passport.serializeUser((user, done) => {
  done(null, user.id); // Storing user.id in session
});

// Deserialize user by retrieving user info from the stored id
passport.deserializeUser((id, done) => {
  // Instead of just returning the id, you might want to find the user in your database using the id
  done(null, { id }); // In real apps, you'd query the database for the user based on the id
});
