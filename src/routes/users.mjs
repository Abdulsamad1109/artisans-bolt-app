import { request, response, Router } from "express";
import { validationResult,matchedData,checkSchema } from "express-validator";
import { userValidationShema } from "../utils/validationShema.mjs";
import { hashpassword } from "../utils/hashPassword.mjs"; 
import { users } from "../utils/database.mjs";


const router = Router()



// registration endpoint for users
router.post(("/api/users/register"), checkSchema(userValidationShema),(request, response)=>{
    try {
        
        const result = validationResult(request)
        if (!result.isEmpty()) return response.status(400).send({errors: result.array()})
        const data = matchedData(request)
        data.password = hashpassword(data.password)
        const newUser = { id: users[users.length - 1].id + 1, ...data }
        users.push(newUser)
        response.send(users)

    } catch (error) {
        console.log("registration failed", error);
    }
  
})


router.get("/api/users", (request,response)=>{
    // console.log(request.session);
    console.log(request.sessionID);
    request.sessionStore.get(request.session.id, (err, sessionData ) =>{
        if(err){
            console.log(err);
            throw err;
        }
        console.log(sessionData);
    })
    
    let allUsers = users.map(user=> user.fullName)
    response.send(allUsers)
    
})


// users log in endpoint 
router.post("/api/users/login", (request, response) =>{

})


export default router