import express, { request, response } from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import allRoutes from './routes/index.mjs';
import passport from "passport";
import './strategies/local-strategy.mjs';

const app = express();

dotenv.config();


const uri = process.env.URI
const cookieParserSecret = process.env.COOKIE_PARSER_SECRET
const sessionSecret = process.env.SESSION_SECRET
const PORT = process.env.PORT || 4000

// mongoose connection
mongoose.connect(uri)
.then(res=>{
    console.log("connected to database");


    app.use(express.json());
    app.use(cookieParser(cookieParserSecret));


    app.use(session(
        {
            secret: sessionSecret,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge : 60000 * 60
            },
            store: MongoStore.create({
                mongoUrl: uri
            })
        }
    ));
    
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    app.use(allRoutes);


    app.listen(PORT, ()=>{
        console.log(`Running on port ${PORT}`);
    });


    app.get("/", (request,response)=>{
        request.session.visited = true
        response.cookie("samad","boy", {maxAge: 60000 * 60, signed: true})
        response.status(201).send("Welcome to artisan-bolt-app API")
    });

    
})
.catch (err=>{
    console.log("connection failed", err);
});






