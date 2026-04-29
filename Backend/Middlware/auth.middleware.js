import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import User from '../Models/user.model.js';

export const ProtectRoute = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Unauthorized" });

        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;
        next();
    } catch (error) {
        console.log("error in protected route middleware:", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}