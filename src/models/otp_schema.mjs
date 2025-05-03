import { model, Schema } from "mongoose";

const otpSchema = new Schema({
    email: String,
    otp: String,
    expiresAt: Date,
});


export const Otp = model("Otp", otpSchema)