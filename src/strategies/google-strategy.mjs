import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/users_schema.mjs";
import dotenv from "dotenv";

dotenv.config();

const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;


 export default passport.use(
    new GoogleStrategy({
    clientID: google_client_id,
    clientSecret: google_client_secret,
    callbackURL: "http://localhost:4000/api/auth/google/redirect",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        
        let findUser;
        // find user by google ID
        findUser = await User.findOne({ googleId: profile.id });
        if(findUser)
            return done(null, findUser);

        // find user by email
        const emailFromGoogle = profile.emails[0].value;
        findUser = await User.findOne({ email: emailFromGoogle });

        // If user exists by email, link the Google account
        if(findUser) {
            findUser.googleId = profile.id;
            await findUser.save();
            return done(null, findUser);
        }
        

        // If no user found, create new Google account
        const newUser = new User({
            googleId: profile.id,
            email: emailFromGoogle,
        });

        await newUser.save();
        return done(null, newUser);

    } catch (err) {
        done(err, null);
        console.log(err);
    }
  }
));

