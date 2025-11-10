import express from "express";
import { Profiler } from "react";
import jwt from "jsonwebtoken";


const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: "15d"})
}

router.post("/register", async (req, res) =>{
    try {
        const {username, email, password} = req.body;

        if(username || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password should be at least 6 character long" })

        }

        if(username.length < 6){
            return res.status(400).json({ message: "Username should be at least 6 character long" })

        }

        const exisitingEmail = await User.findone({ email });
            if(exisitingEmail){
                return res.status(400).json({ message: "Email address is already taken!" })

            }

        const exisitingUsername = await User.findone({ username });
            if(exisitingUsername){
                return res.status(400).json({ message: "Username is already taken!" })

            }

        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const user = new User({
            username,
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
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        console.log("Error in register route", error);
        return res.status(500).json({ message: "Internal server Error!" })


    }

})

router.post("/login", async (req, res) =>{
    res.send("/login");
})

export default router;