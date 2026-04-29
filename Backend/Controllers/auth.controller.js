import User from "../Models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mailer, sendVerificationEmail } from "../NodeMailer.js";


export const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const UserExist = await User.findOne({ email });
        if (UserExist) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiry
        });

        await newUser.save();

        await sendVerificationEmail(email, otp);

        res.status(201).json({ message: "Email verification code sent" });
    } catch (error) {
        console.log("Error in SignUp Controller", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const SignIn = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.isVerified === false) return res.status(400).json({ message: "Please verify your email" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (error) {
        console.log("Error in SignIn Controller", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const VerifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log("Error in VerifyEmail Controller", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}