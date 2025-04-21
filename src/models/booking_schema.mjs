import { Schema,  model } from "mongoose";
import { User } from "./users_schema.mjs";
import { Service } from "./services_schema.mjs";

const bookingSchema = new Schema({
    service: { 
        type: Schema.Types.ObjectId,
        ref: Service,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    descriptoin: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: Date.now,
        required: true
    } 
})

export const Booking = model("Booking", bookingSchema)