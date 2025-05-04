import { model, Schema } from "mongoose";

const otpSchema = new Schema({
    email: String,
    otp: String,
    expiresAt: {
        type: Date,
        default: Date.now,
        index: {expires: 300}
    },
});


export const Otp = model("Otp", otpSchema)