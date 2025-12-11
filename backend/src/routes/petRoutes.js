import express from "express";
import router from "./authRoutes";
import cloudinary from "../lib/cloudinary.js";
import Animal from "../models/Animals.js";
import protectRoute from "../middleware/auth.middleware.js";


const route = express.Router();

router.post("/", protectRoute, async (req, res) => {
    
    try {
        const {petName, PetBreed, PetAge, PetBday, PetImg} = req.body;
        
        if (!PetImg || petName || PetBreed || PetAge || PetBday) {
            return res.status(400).json({ message: "Please provide all fields"});
        }

        //upload to cloudinay
        const uploadResponse = await cloudinary.uploader.upload(PetImg);
        const imageUrl = uploadResponse.secure_url

        //save to database
        const newPet = new Pet({
            petName, 
            PetBreed, 
            PetAge, 
            PetBday, 
            PetImg: imageUrl,
            
        })

        await newPet.save()

        res.status(201).json(newPet)

    } catch (error) {
        console.log("Error in adding new pet", error);
        res.status(500).json({ message: error.message});
    }
});

router.get("/", protectRoute, async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        const pets = await pets.find()
            .sort({createdAt: -1}) //desending
            .skip(skip)
            .limit(limit)
            .populate("user", "user profileImage")

        
        res.send({
            petName

        });

    } catch (error) {
        console.log("Cant find pet", error);
        res.status(401).json({ message: "Internal server error"});

    }
})

export default router