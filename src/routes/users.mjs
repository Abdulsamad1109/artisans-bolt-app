import { request, response, Router } from "express";
import { validationResult,matchedData,checkSchema } from "express-validator";
import { userValidationShema } from "../utils/validationShema.mjs";
import { hashpassword } from "../utils/hashPassword.mjs"; 
import passport from "passport";
import { User } from "../models/users_schema.mjs";


const router = Router()



// registration endpoint for users
router.post(("/api/users/register"), checkSchema(userValidationShema), async (request, response) => {
    try {
        
        const result = validationResult(request)
        if (!result.isEmpty()) return response.status(400).send({errors: result.array()})
        const data = matchedData(request)
        data.password = hashpassword(data.password)
        const newUser = new User(data)
        const savedUser = await newUser.save()
        return response.status(201).send(savedUser)

    } catch (error) {
        console.log("registration failed", error);
        return response.sendStatus(400)
    }
  
})


router.get("/api/auth/status", (request,response) => {

    return request.user ? response.send(request.user) :response.sendStatus(401)
    
})


// users log in endpoint 
router.post("/api/users/login", passport.authenticate('local'), (request, response) => {
    response.status(200).send("logged in sucessfully")
})


export default router