import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from "dotenv"
import mongoose from 'mongoose';
import authRoutes from './Routes/auth.route.js';
import projectRoutes from './Routes/project.route.js';
import taskRoutes from './Routes/task.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    console.log('Connected to MongoDB');
})



