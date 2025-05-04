import { request, response, Router } from "express";
import { generateOtp } from "../utils/generate-otp.mjs";
import { transporter } from "../utils/email-verification.mjs";
import { Otp } from "../models/otp_schema.mjs";

let router = Router();

router.post('/api/send-otp', async (request, response) => {
    let {email} = request.body
    try {
        const sixDigitsPin = generateOtp()

        const info = await transporter.sendMail({
            from: '"Tuse" <gbadebosamad0@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Email Verification", // Subject line
            replyTo: 'gbadebosamad0@gmail.com',
            text: `Hello,

            Thank you for signing up. To complete your registration, please use the verification code below:

            ${sixDigitsPin}

            This code will expire in 10 minutes. If you didn't request this, please ignore this email.

            Best regards,  
            Tuse Team
            `, // plain text body
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #1e1e1e; color: #ffffff; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto;">
                <div style="background-color: #5b46f6; padding: 12px 0; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="color: #ffffff; margin: 0; font-size: 18px;">Verify Your Email</h2>
                </div>
                <div style="padding: 20px; background-color: #2a2a2a; border-radius: 0 0 8px 8px;">
                <p>Hello,</p>
                <p>Thank you for signing up. To complete your registration, please use the verification code below:</p>
                <p style="font-size: 28px; color: #b7aaff; font-weight: bold; text-align: center; margin: 30px 0;">${sixDigitsPin}</p>
                <p>This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
                <p style="margin-top: 40px;">Best regards,<br>Tuse Team</p>
                </div>
            </div>
            `, // html body
          });

        //   save the otp and email to DB
            const otpVerification = new Otp({
                email,
                otp: sixDigitsPin
            })
            const savedOtp = await otpVerification.save()
            console.log(savedOtp);
            request.session.email = email
          response.status(200).send(info)
          console.log(request.session.email);
          

    } catch (error) {
        console.log("failed to send otp", error);
        response.sendStatus(400);
    }

});

router.post("/api/verify-otp", async (request, response) =>{
    const {otpFromUser} = request.body;
    const email = request.session.email;
    console.log(email);
    

    if(!email) return response.status(400).send("email missing, re-register");
    try {
        let emailAndOtp = await Otp.findOne({email, otp: otpFromUser});
        if(!emailAndOtp) return response.status(400).send("invalid OTP");
        response.status(200).send("OTP verified")
            console.log(emailAndOtp);
        
    } catch (error) {
        console.log("email not verified", error);
        return response.status(500).send("Server error verifying OTP");
    }

     

});

export default router;