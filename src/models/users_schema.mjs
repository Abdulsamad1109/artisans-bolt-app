import { Schema,  model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: String
    },

    password: {
        type: String,
    },
    
    googleId: {
        type: String,
        unique: true
    },

    address: {
        type: String
    },

    gender: {
        type: String
    }
    
})

export const User = model("User", userSchema)