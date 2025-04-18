import { Schema,  model } from "mongoose";

const serviceSchema = new Schema({

    type: {
        type: String,
        required: true,
    },
    user: {type: Schema.Types.ObjectId}

})

export const Service = model("Service", serviceSchema)