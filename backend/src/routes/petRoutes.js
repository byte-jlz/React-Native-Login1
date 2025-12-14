import express from "express";
import multer from "multer";
import cloudinary from "../lib/cloudinary.js";
import Animal from "../models/Animals.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    },
});

// Global io instance
let io;

export const setIO = (ioInstance) => {
    io = ioInstance;
};

// POST - Add new pet
router.post("/", protectRoute, upload.single("petImg"), async (req, res) => {
    try {
        const { petName, petBreed, petAge, petBday, petGender } = req.body;

        if (!req.file || !petName || !petBreed || !petAge || !petBday) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        let imageUrl;

        // If file is provided, upload to cloudinary
        if (req.file) {
            try {
                const base64Image = req.file.buffer.toString("base64");
                const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

                const uploadResponse = await cloudinary.uploader.upload(dataURI, {
                    folder: "snugglebuds/pets",
                    resource_type: "auto",
                });
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.log("Error uploading to Cloudinary:", uploadError);
                return res
                    .status(500)
                    .json({ message: "Failed to upload image" });
            }
        }

        // Save to database
        const newPet = new Animal({
            petName,
            petBreed,
            petAge,
            petBday,
            petGender,
            petImg: imageUrl,
            user: req.user._id,
        });

        await newPet.save();

        // Populate user info before emitting
        await newPet.populate("user", "name profileImage");

        // Emit WebSocket event to all connected clients
        if (io) {
            io.emit("pet_added", newPet);
            console.log("Emitted pet_added event:", newPet._id);
        }

        res.status(201).json(newPet);
    } catch (error) {
        console.log("Error in adding new pet", error);
        res.status(500).json({ message: error.message });
    }
});

// GET - Fetch all pets for authenticated user
router.get("/", protectRoute, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const pets = await Animal.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "name profileImage");

        const totalPets = await Animal.countDocuments({ user: req.user._id });

        res.status(200).json({
            pets,
            currentPage: page,
            totalPets,
            totalPages: Math.ceil(totalPets / limit),
        });
    } catch (error) {
        console.log("Cant find pet", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE - Remove pet by ID
router.delete("/:id", protectRoute, async (req, res) => {
    try {
        const pet = await Animal.findById(req.params.id);

        if (!pet) return res.status(404).json({ message: "Pet not Found" });

        if (pet.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Delete image from cloudinary if it exists
        if (pet.petImg) {
            try {
                const publicId = pet.petImg.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`snugglebuds/pets/${publicId}`);
            } catch (deleteError) {
                console.log("Error in deleting image from cloudinary", deleteError);
            }
        }

        await Animal.findByIdAndDelete(req.params.id);

        // Emit WebSocket event to all connected clients
        if (io) {
            io.emit("pet_deleted", req.params.id);
            console.log("Emitted pet_deleted event:", req.params.id);
        }

        res.json({ message: "Pet Removed successfully" });
    } catch (error) {
        console.log("Error in removing pet", error);
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update pet by ID
router.put("/:id", protectRoute, upload.single("petImg"), async (req, res) => {
    try {
        const { petName, petBreed, petAge, petBday, petGender } = req.body;
        const pet = await Animal.findById(req.params.id);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // Verify user owns this pet
        if (pet.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let imageUrl = pet.petImg;

        // If new image is provided, upload it
        if (req.file) {
            try {
                // Delete old image from cloudinary
                if (pet.petImg) {
                    const publicId = pet.petImg.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(`snugglebuds/pets/${publicId}`);
                }

                const base64Image = req.file.buffer.toString("base64");
                const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

                const uploadResponse = await cloudinary.uploader.upload(dataURI, {
                    folder: "snugglebuds/pets",
                    resource_type: "auto",
                });
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.log("Error uploading to Cloudinary:", uploadError);
                return res
                    .status(500)
                    .json({ message: "Failed to upload image" });
            }
        }

        // Update pet
        const updatedPet = await Animal.findByIdAndUpdate(
            req.params.id,
            {
                petName: petName || pet.petName,
                petBreed: petBreed || pet.petBreed,
                petAge: petAge || pet.petAge,
                petBday: petBday || pet.petBday,
                petGender: petGender || pet.petGender,
                petImg: imageUrl,
            },
            { new: true }
        ).populate("user", "name profileImage");

        // Emit WebSocket event
        if (io) {
            io.emit("pet_updated", updatedPet);
            console.log("Emitted pet_updated event:", updatedPet._id);
        }

        res.status(200).json(updatedPet);
    } catch (error) {
        console.log("Error updating pet:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;