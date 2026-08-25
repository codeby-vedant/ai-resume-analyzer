const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://ai-resume-analyzer-rdsq.onrender.com/api/google/auth",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google account does not provide an email"));
        }

        // 1. Check if Google account is already linked
        let user = await User.findOne({
          googleId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        // 2. Check if a normal ResumeIQ account already exists
        user = await User.findOne({
          email: email,
        });

        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;

          // Optionally update name
          user.name = profile.displayName;

          await user.save();

          return done(null, user);
        }

        // 3. No existing account → create new user
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: email,
        });

        return done(null, user);

      } catch (err) {
        console.error("Google authentication error:", err);
        return done(err, null);
      }
    }
  )
);