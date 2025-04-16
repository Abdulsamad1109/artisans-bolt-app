import { Schema,  model } from "mongoose";

const serviceSchema = new Schema({

    type: {
        type: String,
        required: true,
    },

})

export const Service = model("Service", serviceSchema)