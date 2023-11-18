import { Schema, model } from "mongoose";

const userSchema=new Schema({
    name: String,
    gender: {
        type: String,
        maxLength: 1
    },
    domain: {
        type: String,
    },
    availability: {
        type: Boolean,
    },
});

const User=model('User', userSchema);

export default User;
