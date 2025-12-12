import express from "express";
//import router from "./authRoutes";
import cloudinary from "../lib/cloudinary.js";
import Animal from "../models/Animals.js";
import protectRoute from "../middleware/auth.middleware.js";


const router = express.Router();

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
        const newPet = new Animal({
            petName, 
            PetBreed, 
            PetAge, 
            PetBday, 
            PetImg: imageUrl,
            user: req.user._id
            
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
            .sort({createdAt: -1}) //descending
            .skip(skip)
            .limit(limit)
            .populate("user", "user profileImage")

        const totalPets = await pets.countDocument();
        
        res.send({
            petName,
            currentPage: page,
            totalPets,
            totalPages: Math.ceil(totalPets / limit)

        });

    } catch (error) {
        console.log("Cant find pet", error);
        res.status(500).json({ message: "Internal server error"});

    }
})

router.delete("/:id", protectRoute, async (req, res) => {

    try {
        const pet = await Animal.findById(req.params.id);

        if(!pet) return res.status(404).json({ message: "Pet not Found" });
        
        if(Animal.user.toString() !== req.user._id.toString()) return res.status(404).json({ message: "Unauthorized" });

        if(Animal.image && Animal.image.include("cloudinary")){
            try {
                const publicId = Animal.image.split("/").pop().split(",")[0];
                await cloudinary.uploader.destroy(publicId);


            } catch (deleteError) {
                console.log("Error in deleting image from couldinary", deleteError)
            }
        }

        await Animal.deleteOne();

        res.json({ message: "Pet Remove successfully"});

    } catch (error) {
        console.log("Error in removing pet", error);
        res.status(500).json({ message: error.message});

    }

})



export default router