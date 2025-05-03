import crypto from "crypto"

// funtion to generate OTP
export const generateOtp = () => {

    const buffer = crypto.randomBytes(4); 
    const otp = (buffer.readUInt32BE() % 1000000).toString().padStart(6, '0');
    return otp;
    
}


