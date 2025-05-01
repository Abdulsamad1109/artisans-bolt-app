import { request, response, Router } from "express";
import { validationResult,matchedData,checkSchema } from "express-validator";
import { userValidationShema } from "../utils/validationShema.mjs";
import { hashpassword } from "../utils/hashPassword.mjs"; 
import passport from "passport";
import { User } from "../models/users_schema.mjs";
import { authenticateUser } from "../utils/userAuthentication.mjs";


const router = Router();


// registration endpoint for users
router.post(("/api/users/register"), checkSchema(userValidationShema), async (request, response) => {
    try {
        // This validates the request body and saves the hashed password 
        const result = validationResult(request);
        if (!result.isEmpty()) return response.status(400).send({errors: result.array()});
        const data = matchedData(request);
        data.password = hashpassword(data.password);

        // To check if the user exists in the database
        const findUser = await User.findOne({ email: data.email });
        if(findUser) return response.send("email already exist");
        console.log(data)
        // This saves a new user to the database if the email doesn't already exist
        const newUser = new User(data);
        const savedUser = await newUser.save();
        return response.status(201).send(savedUser);

    } catch (error) {
        console.log("registration failed", error);
        return response.sendStatus(400);
    }
  
});


// users login endpoint 
router.post("/api/users/login", passport.authenticate('local'), (request, response) => {

    response.status(200).send("logged in sucessfully");
});


// users logout endpoint
router.post('/api/users/logout', (request,response) => {
    if(!request.user) return response.sendStatus(401);
    request.logout((err) => {
        if(err) return response.sendStatus(400);
        response.send(200);
    });
});



router.get("/api/users/profile", authenticateUser, (request, response) => {
    response.status(200).send(request.user);

});


router.post('/api/users/update-profile', authenticateUser, async (request,response) => {
    const {firstName, lastName, phoneNumber, gender, address} = request.body;
    let userId = request.user.id;
    try {
        // find by user ID and update
        const updatedUser = await User.findOneAndUpdate(
            {_id: userId},
            {$set: {firstName, lastName, phoneNumber, gender, address}},
            {new: true}
        );

        // save updated the fields
        let savedUser = await updatedUser.save();
        response.status(200).send(savedUser);

    } catch (err) {
        console.log("failed to update user profile", err);
        
    }

});


export default router