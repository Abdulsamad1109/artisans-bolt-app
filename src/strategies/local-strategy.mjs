import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/users_schema.mjs";
import { comparePassword } from "../utils/hashPassword.mjs";


passport.serializeUser((user, done) => {
    console.log("inside serialize user");
    console.log(user);
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    
    try {
        const findUser = await User.findById(id)
        if(!findUser) throw new Error('user not found')
            done(null, findUser)
    } catch (error) {
        done(error, null)
    }
})

export default passport.use(
    new Strategy({usernameField: "email"}, async (email, password, done) => {

        try {
            // checking if the email is available in the DB
            const findUser = await User.findOne({ email })
            if(!findUser) throw Error("user not found")

            // comparing the password with the hashed password in the DB 
            if(!comparePassword(password, findUser.password))
              throw Error("invalid details")
            done(null, findUser)
        } catch (error) {
            done(error, null)
        }
    })
)

