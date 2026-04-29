import express from "express";
import { ProtectRoute } from "../Middlware/auth.middleware.js";
import { CreateProject, getProject, deleteProject } from "../Controllers/task.controller.js";

const router = express.Router();

router.post("/create", ProtectRoute, CreateProject);
router.get("/", ProtectRoute, getProject);
router.delete("/delete/:id", ProtectRoute, deleteProject);

export default router;