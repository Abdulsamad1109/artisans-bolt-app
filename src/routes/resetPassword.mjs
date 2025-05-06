import { request, response, Router } from "express";
import { User } from "../models/users_schema.mjs";
import { sendOtp, verifyOtp } from "../utils/resetPassswordOtpFunc.mjs";
import { hashpassword } from "../utils/hashPassword.mjs";

const router = Router()

// route that sends otp to reset password if user forgets
router.post("/api/reset-password-otp", async (request, response) => {
    const {email} = request.body;

    try {
        const findUser = await User.findOne({email});
        if(!findUser) 
            return response.status(400).send("email does not exist")
        
        // send OTP to the user's email and save userdata
        const otpResult = await sendOtp({
            email,
            session: request.session
        })

        if(!otpResult.success) return response.sendStatus(400);
        response.status(200).send("OTP sent to reset password");
        

    } catch (error) {
        console.log("password reset failed", error);
        return response.sendStatus(400);
    }
});



// route that verify otp to reset password
router.post("/api/verify-reset-password-otp", async (request, response) => {
    const {otpFromUser} = request.body;

    try {
        const verificationResult = await verifyOtp(otpFromUser, request.session)
        if(!verificationResult.success) return response.status(400).send("unable to verify")
        response.status(200).send("OTP verified to reset password");

    } catch (error) {
        
    }
})



// route that resets password after otp is verified
router.post("/api/reset-password", async (request, response) => {
    const {newPassword} = request.body;
    const email = request.session.email
    
    // hash the raw password before saving to the DB
    const hashedpassword = hashpassword(newPassword)

    
    try {

        // find user by email in DB
        const findUser = await User.findOne({email})
        if(!findUser) 
            return response.status(400).send("email does not exist")

        await User.findOneAndUpdate(
            {email},
            {$set : {password: hashedpassword}},
            { new: true }
        )

        response.status(200).send("password reset successfully")

    } catch (error) {
        console.log("failed to reset password", error);
        
    }
})

export default router;