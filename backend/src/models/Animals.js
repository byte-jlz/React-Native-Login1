import mongoose, { mongo, Mongoose } from "mongoose";
import User from "../models/User.js";

const animalSchema = new mongoose.Schema({
    petName:{
        type: String,
        require: true
    },
    petBreed:{
        type: String,
        require: true
    },
    petAge:{
        type: Number,
        require: true
    },
    petBday:{
        type: Date,
        require: true
    },
    petImg:{
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // <--- FIX: Use the string name "User", not the imported variable
        required: true
    }


}, {timestamps:true})

const Animal = mongoose.model("Animal", animalSchema)

export default Animal;