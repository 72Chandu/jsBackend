const express = require("express");
const passport = require("passport");
const router = express.Router();

// Step 1: Initiating Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Handling the callback after Google has authenticated the user
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }), // Redirect on failure
  (req, res) => {
    // Successful authentication, redirect to a protected route (e.g., profile page)
    res.redirect("/profile");
  }
);

module.exports = router;
