import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/database.mjs";


export default passport.use(
    new Strategy({usernameField: "email"}, (email, password, done) => {
        try {
            const findUser = users.find((user) => user.email === email)
            if(!findUser) throw Error("user not found")
            if(findUser.password !== password)
              throw Error("invalid details")
            done(null, findUser)
        } catch (error) {
            done(err, null)
        }
    })
)

