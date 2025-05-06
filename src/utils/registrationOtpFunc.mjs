import { generateOtp } from "./generate-otp.mjs";
import { transporter } from "./transporter.mjs";
import { Otp } from "../models/otp_schema.mjs";
import { User } from "../models/users_schema.mjs";




// function to send OTP to complete registration
export const sendOtp = async ({ firstName, lastName, email, phoneNumber, password, session }) => {

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

            This code will expire in 5 minutes. If you didn't request this, please ignore this email.

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
                <p>This code will expire in 5 minutes. If you didn't request this, please ignore this email.</p>
                <p style="margin-top: 40px;">Best regards,<br>Tuse Team</p>
                </div>
            </div>
            `, // html body
          });

        //   save the otp and user data temporarily to DB
            const otpVerification = new Otp({
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                otp: sixDigitsPin
            })
            const savedOtp = await otpVerification.save()

            // save the email to the session
            if(session) session.email = email

            return { success: true, message: "OTP sent to complete registration", info };

    } catch (error) {
        console.log("failed to send otp", error);
        return { success: false, message: "Failed to send OTP to complete registration", error };
    }

}






// function to verify OTP to complete registration
export const verifyOtpAndCreateNewUser = async (otpFromUser, session) => {

    
    try {

        const email = session.email;

        if (!email) return { success: false, message: "Email missing, re-register" };
            // finds the otp from DB
            let verifiedUser = await Otp.findOne({email, otp: otpFromUser});
    
            // checks if the OTP exists in the DB, if it doesnt, it has expired
            if(!verifiedUser) return { success: false, message: "Invalid OTP" };
    
            // save the user in the users collection
            const newUser = new User({
                        firstName: verifiedUser.firstName,
                        lastName: verifiedUser.lastName,
                        email: verifiedUser.email,
                        phoneNumber: verifiedUser.phoneNumber,
                        password: verifiedUser.password,
                    });
            
            const savedUser = await newUser.save();
            return savedUser

    } catch (error) {
        console.log("failed to verify otp", error);
        return { success: false, message: "failed to verify otp", error };
    }


}