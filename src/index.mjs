import express, { request, response } from "express";
import {connect} from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import session from "express-session";
import allRoutes from './routes/index.mjs'
import passport from "passport";
import './strategies/local-strategy.mjs'

const app = express()

dotenv.config()
const uri = process.env.URI
const cookieParserSecret = process.env.COOKIE_PARSER_SECRET
const sessionSecret = process.env.SESSION_SECRET

// mongoose connection
connect(uri)
.then(res=>{
    console.log("connected to database")
})
.catch (err=>{
    console.log("connection failed")
})


app.use(express.json())
app.use(cookieParser(cookieParserSecret))
app.use(session(
    {
        secret: sessionSecret,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge : 60000*2
        }
    }
))


app.use(passport.initialize())
app.use(passport.session()) 


app.use(allRoutes) 


app.get("/", (request,response)=>{
    request.session.visited = true
    response.cookie("samad","boy", {maxAge: 60000*2, signed: true})
    response.status(201).send("Hello World!")
})

app.post('/api/auth', passport.authenticate('local'), (request, response) => {

})


const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})

