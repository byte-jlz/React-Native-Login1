import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
            return res.status(400).json({ message: "Please input your fullname2" })

        }

        const exisitingEmail = await User.findOne({ email });
            if(exisitingEmail){
                return res.status(400).json({ message: "Email address is already taken!" })

            }


        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

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
                id: user._id,
                name: user.name,
                email: user.email
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
        
        const isPasswordCorrect = await User.comparePassword(password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials!"});

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log("Error in login route", error);
        return res.status(500).json({ message: "Internal server Error!" });

    }
})

export default router;