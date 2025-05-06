import { generateOtp } from "./generate-otp.mjs";
import { transporter } from "./transporter.mjs";
import { resetPasswordOtp } from "../models/reset_password_otp_schema.mjs";
import { User } from "../models/users_schema.mjs";




// function to send OTP to reset password
export const sendOtp = async ({ email, session }) => {

    try {
        const sixDigitsPin = generateOtp()

        const info = await transporter.sendMail({
            from: '"Tuse" <gbadebosamad0@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Password Reset", // Subject line
            replyTo: 'gbadebosamad0@gmail.com',
            text: `Hello,

            Thank you for choosing Tuse. To reset your password, please use the verification code below:

            ${sixDigitsPin}

            This code will expire in 5 minutes. If you didn't request this, please ignore this email.

            Best regards,  
            Tuse Team
            `, // plain text body
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #1e1e1e; color: #ffffff; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto;">
                <div style="background-color: #5b46f6; padding: 12px 0; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="color: #ffffff; margin: 0; font-size: 18px;">Reset Your Password</h2>
                </div>
                <div style="padding: 20px; background-color: #2a2a2a; border-radius: 0 0 8px 8px;">
                <p>Hello,</p>
                <p>Thank you for signing up. To reset your password, please use the verification code below:</p>
                <p style="font-size: 28px; color: #b7aaff; font-weight: bold; text-align: center; margin: 30px 0;">${sixDigitsPin}</p>
                <p>This code will expire in 5 minutes. If you didn't request this, please ignore this email.</p>
                <p style="margin-top: 40px;">Best regards,<br>Tuse Team</p>
                </div>
            </div>
            `, // html body
          });

        //   save the otp and user email temporarily to DB
            const otpVerification = new resetPasswordOtp({
                email,
                otp: sixDigitsPin
            })
            const savedOtp = await otpVerification.save()

            // save the email to the session
            if(session) session.email = email

            return { success: true, message: "OTP sent to reset password", info };

    } catch (error) {
        console.log("Failed to send OTP to reset password", error);
        return { success: false, message: "Failed to send OTP to reset password", error };
    }

}






// function to verify OTP to reset password
export const verifyOtp = async (otpFromUser, session) => {

    
    try {

        const email = session.email;

        if (!email) return { success: false, message: "Email missing, re-enter your email" };

            // finds the otp from DB
            let verifiedUser = await resetPasswordOtp.findOne({email, otp: otpFromUser});
    
            // checks if the OTP exists in the DB, if it doesn't, it has expired
            if(!verifiedUser) return { success: false, message: "Invalid OTP" };
    
            return { success: true, message: "OTP verified to reset password" };

    } catch (error) {
        console.log("failed to verify otp to reset password", error);
        return { success: false, message: "failed to verify otp to reset password", error };
    }


}