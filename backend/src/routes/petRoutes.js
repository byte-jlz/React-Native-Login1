import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Animal from "../models/Animals.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
    try {
        const {petName, petBreed, petAge, petBday, petImg} = req.body;
        
        if (!petImg || !petName || !petBreed || !petAge || !petBday) {
            return res.status(400).json({ message: "Please provide all fields"});
        }

        //upload to cloudinay
        const uploadResponse = await cloudinary.uploader.upload(petImg);
        const imageUrl = uploadResponse.secure_url;

        //save to database
        const newPet = new Animal({
            petName, 
            petBreed, 
            petAge, 
            petBday, 
            petImg: imageUrl,
            user: req.user._id
        });

        await newPet.save();

        res.status(201).json(newPet);

    } catch (error) {
        console.log("Error in adding new pet", error);
        res.status(500).json({ message: error.message});
    }
});

router.get("/", protectRoute, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const pets = await Animal.find({ user: req.user._id })
            .sort({createdAt: -1}) //descending
            .skip(skip)
            .limit(limit)
            .populate("user", "name profileImage");

        const totalPets = await Animal.countDocuments({ user: req.user._id });
        
        res.status(200).json({
            pets,
            currentPage: page,
            totalPets,
            totalPages: Math.ceil(totalPets / limit)
        });

    } catch (error) {
        console.log("Cant find pet", error);
        res.status(500).json({ message: "Internal server error"});
    }
});

router.delete("/:id", protectRoute, async (req, res) => {
    try {
        const pet = await Animal.findById(req.params.id);

        if(!pet) return res.status(404).json({ message: "Pet not Found" });
        
        if(pet.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if(pet.petImg){
            try {
                const publicId = pet.petImg.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteError) {
                console.log("Error in deleting image from cloudinary", deleteError);
            }
        }

        await Animal.findByIdAndDelete(req.params.id);

        res.json({ message: "Pet Removed successfully"});

    } catch (error) {
        console.log("Error in removing pet", error);
        res.status(500).json({ message: error.message});
    }
});

export default router;