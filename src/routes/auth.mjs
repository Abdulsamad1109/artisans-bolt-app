// import { Router } from "express";
// import passport from "passport";
// import '../strategies/local-strategy.mjs'
// import { authenticateUser } from "../utils/userAuthentication.mjs";

// const router = Router();


// // users login endpoint 
// router.post("/api/users/login", passport.authenticate('local'), (request, response) => {

//     response.status(200).send("logged in sucessfully");
// });


// // router.get("/api/auth/status", (request,response) => {
// //     if(!request.user) return response.status(401).send("please log in to your account");

// //     // convert mongoose document to plain-js obj
// //     const userObj = request.user.toObject();
    
// //     // excluded the user password before send to the client
// //     const {password, ...userWithoutPassword} = userObj
// //     return response.status(200).send(userWithoutPassword);
    
// // });

// // users logout endpoint
// router.post('/api/users/logout', (request,response) => {
//     if(!request.user) return response.sendStatus(401);
//     request.logout((err) => {
//         if(err) return response.sendStatus(400);
//         response.send(200);
//     });
// });



// export default router