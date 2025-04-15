import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/database.mjs";


passport.serializeUser((user, done) => {
    console.log(`inside serializing`);
    console.log(user);
    
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(`deserializing ${id}`);
    
    try {
        const findUser = users.find((user) => user.id === id)
        if(!findUser) throw new Error('user not found')
            done(null, findUser)
    } catch (error) {
        done(error, nul)
    }
})

export default passport.use(
    new Strategy({usernameField: "email"}, (email, password, done) => {
        console.log(`email : ${email}`)
        console.log(`password : ${password}`)
        try {
            const findUser = users.find((user) => user.email === email)
            if(!findUser) throw Error("user not found")
            if(findUser.password !== password)
              throw Error("invalid details")
            done(null, findUser)
        } catch (error) {
            done(error, null)
        }
    })
)

