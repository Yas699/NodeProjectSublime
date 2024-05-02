import { mongoose } from "./Base.mjs";

const customerSchema = new mongoose.Schema(
    {
        _id : {
            type : Number
        },
        first_name : {
            type : String,
            required : true
        },
        last_name : {
            type : String,
            required : true,
        },
        city : {
            type : String,
            required : true
        },
        company : {
            type : String,
            required : true
        }
    },
    {
        versionKey : false
    }
);

export const customerCollection = mongoose.model('customers', customerSchema);