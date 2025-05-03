import nodemailer from "nodemailer";
import { Otp } from "../models/otp_schema.mjs";
import dotenv from "dotenv";

dotenv.config();


 export const userVerificaton = () =>{
 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.TRANSPORTER_USER,
            pass: process.env.TRANSPORTER_PASS,
        },
    });


    // async function main() {
    //     // send mail with defined transport object
    //     const info = await transporter.sendMail({
    //       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    //       to: "bar@example.com, baz@example.com", // list of receivers
    //       subject: "Hello ✔", // Subject line
    //       text: "Hello world?", // plain text body
    //       html: "<b>Hello world?</b>", // html body
    //     });
    
    

}
 
