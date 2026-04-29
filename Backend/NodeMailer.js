import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

export const sendVerificationEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"INTERN" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Email Verification',
            text: `Your OTP for email verification is ${otp}. It will expire in 10 minutes.`
        };
        await mailer.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
}