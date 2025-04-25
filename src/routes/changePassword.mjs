import { request, response, Router } from "express";
import { authenticateUser } from "../utils/userAuthentication.mjs";
import { User } from "../models/users_schema.mjs";
import { comparePassword, hashpassword } from "../utils/hashPassword.mjs";



const router = Router();

// route to change user password
router.post("/api/changePassword", authenticateUser, async (request, response) => {
    try {

        const { oldPassword, newPassword } = request.body

        // extract user ID from the request body
        const userId = request.user.id;

        // find the user by ID
        const finduser = await User.findOne({_id: userId});
        
        // compare old password
        if(!comparePassword(oldPassword, finduser.password))
            return response.status(400).send("old password is incorrect");

        // hash the new password and update to DB
        const newHashedPassword = hashpassword(newPassword);
        const savedNewPassword = await User.findOneAndUpdate(
            { _id: userId },
            { $set: {password : newHashedPassword} },
            { new: true }
        );

        response.status(200).send(savedNewPassword);

    } catch (error) {

        console.log("failed to change password", error);
        response.sendStatus(400);

    }
})


export default router;