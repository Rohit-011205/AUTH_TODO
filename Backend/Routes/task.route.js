import express from "express";
import { ProtectRoute } from "../Middlware/auth.middleware.js";
import {createTask,getTask,updateTask,deleteTask } from "../Controllers/task.controller.js"

const router = express.Router();

router.post("/create", ProtectRoute, createTask);
router.get("/get/:id", ProtectRoute, getTask);
router.put("/update/:id/status", ProtectRoute, updateTask);
router.delete("/delete/:id", ProtectRoute, deleteTask);

export default router;