import nodemailer from "nodemailer";
import { Otp } from "../models/otp_schema.mjs";
import dotenv from "dotenv";

dotenv.config();


 
export    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.TRANSPORTER_USER,
            pass: process.env.TRANSPORTER_PASS,
        },
    });



