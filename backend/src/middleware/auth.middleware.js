import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { response } from "express";



const protectRoute = async(req,res,next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if(!token) return res.status(401).json({ message: "No authentication token, access denied" });
        
        const decoded = jwt.verify(token, process.end.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "Token is not valid"}); 

        req.user = User;
        next();

    } catch (error) {
        console.log("Authentication Error", error);
        res.status(401).json({ message: "Token is not valid"});

    }
};

export default protectRoute;