import { model, Schema } from "mongoose";

const resetPasswordOtpSchema = new Schema({
    email: String,
    otp: String,
    expiresAt: {
        type: Date,
        default: Date.now,
        index: {expires: 300}
    },
});


export const resetPasswordOtp = model("resetPasswordOtp", resetPasswordOtpSchema)