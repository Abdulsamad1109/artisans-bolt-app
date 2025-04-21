import { Schema,  model } from "mongoose";


const bookingSchema = new Schema({
    service: { 
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    address: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    status: {
        type: String
    }
})

export const Booking = model("Booking", bookingSchema)