import express, { request, response } from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import session from "express-session";
import allRoutes from './routes/index.mjs';
import passport from "passport";
import './strategies/local-strategy.mjs';
import './strategies/google-strategy.mjs'

const app = express();

dotenv.config();


const uri = process.env.URI

const sessionSecret = process.env.SESSION_SECRET
const PORT = process.env.PORT || 4000

// mongoose connection
mongoose.connect(uri)
.then(res=>{
    console.log("connected to database");


    app.use(express.json());


    app.use(session(
        {
            secret: sessionSecret,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge : 60000 * 5
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


    app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


    app.get('/api/auth/google/redirect', 
        passport.authenticate('google',{
            failureRedirect: '/api/users/login',
            successRedirect: '/'
            }),
        );


    app.get("/", (request,response)=>{
        request.session.visited = true
        response.status(201).send("Welcome to artisan-bolt-app API")
    });

    
})
.catch (err=>{
    console.log("connection failed", err);
});






