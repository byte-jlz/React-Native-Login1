import mongoose, { mongo, Mongoose } from "mongoose";
import User from "./User";

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
    user:{
        tyep: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }

}, {timestamps:true})

const Animal = mongoose.model("Animal", animalSchema)

export default Animal;