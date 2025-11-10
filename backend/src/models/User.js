import express from "express";
import mongoose from "mongoose";
import ChangeEmailScreen from "../../../mobile/app/changeEmail";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profileImage: {
        type: String,
        default: "",

    }

});

userSchema.pre("save", async function (next) {

    if(this.isModefied("password")) return next();
    
    const salt = await bcrypt.gensalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();

})

const User = mongoose.model("User", userSchema)

export default User;