import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: "15d"})
}

router.post("/register", async (req, res) =>{
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password should be at least 6 character long" })

        }

        if(name.length < 4){
            return res.status(400).json({ message: "Name should be at least 4 characters long" })

        }

        const exisitingEmail = await User.findOne({ email });
            if(exisitingEmail){
                return res.status(400).json({ message: "Email address is already taken!" })

            }

        // Use email as seed to ensure SAME avatar every time
        // Use PNG format instead of SVG for React Native compatibility
        const profileImage = `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(email)}`;

        const user = new User({
            name,
            email,
            password,
            profileImage,
        })

        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        });


    } catch (error) {
        console.log("Error in register route", error);
        return res.status(500).json({ message: "Internal server Error!" });


    }

})

router.post("/login", async (req, res) =>{
    try {
        const {email, password} = req.body;

        if (!email || !password) return res.status(400).json({ message: "All fields are required!"});

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ message: "Invalid Credentials!"});
        
        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials!"});

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        })

    } catch (error) {
        console.log("Error in login route", error);
        return res.status(500).json({ message: "Internal server Error!" });

    }
})

// GET - Fetch authenticated user's profile
router.get("/profile", protectRoute, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

    } catch (error) {
        console.log("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PUT - Update user profile
router.put("/profile", protectRoute, async (req, res) => {
    try {
        const { name, email, profileImage } = req.body;
        const userId = req.user._id;

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ 
                email: email,
                _id: { $ne: userId }
            });
            
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name: name || undefined,
                email: email || undefined,
                profileImage: profileImage || undefined,
            },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log("Error updating profile:", error);
        res.status(500).json({ message: error.message });
    }
});

// Add this route to your authRoutes.js file

// PUT - Change user password
router.put("/change-password", protectRoute, async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.user._id;

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ 
                message: "Please provide all fields" 
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ 
                message: "New passwords do not match" 
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ 
                message: "Password must be at least 6 characters long" 
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isPasswordCorrect = await user.comparePassword(currentPassword);
        if (!isPasswordCorrect) {
            return res.status(400).json({ 
                message: "Current password is incorrect" 
            });
        }

        // Check if new password is same as current password
        const isSamePassword = await user.comparePassword(newPassword);
        if (isSamePassword) {
            return res.status(400).json({ 
                message: "New password must be different from current password" 
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ 
            message: "Password changed successfully" 
        });

    } catch (error) {
        console.log("Error changing password:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;