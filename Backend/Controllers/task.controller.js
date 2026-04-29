import Task from "../Models/task.model.js";
import Project from "../Models/project.model.js";

export const CreateProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        const project = new Project({
            title,
            description,
            userId: req.user.id
        })

        await project.save();

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error });
        console.log("Error in CreateProject Controller", error);
    }
}

export const getProject = async (req, res) => {
    try {
        const projects = await Project.find({
            userId: req.user.id
        })

        res.status(200).json({
            projects
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
        console.log("Error in getProjects Controller", error);
    }
}

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!project) return res.status(404).json({ message: "Project not found" });

        await Task.deleteMany({ projectId: project._id });

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error });
        console.log("Error in deleteProject Controller", error);
    }
}


export const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const { projectId } = req.params;

        const project = await Project.findOne({
            _id: projectId,
            userId: req.user.id
        });

        if (!project) return res.status(404).json({ message: "Project not found" });

        if (project.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized Access" });

        const task = new Task({
            title,
            description,
            status,
            dueDate,
            userId: req.user.id,
            projectId
        })

        await task.save();

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
        console.log("Error in createTask Controller", error);
    }
}

export const getTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ projectId, userId: req.user.id });
        res.status(200).json({ tasks });
    } catch (error) {
        console.log("Error in getTask Controller", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized Access" });

        task.status = req.body.status;
        await task.save();

        res.status(200).json({ message: "Task updated!", task })
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task", error });
        console.log("Error in updateTask Controller", error);
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.userId.toString() !== req.user.id)
            return res.status(401).json({ message: "Not authorized" });

        await task.deleteOne();
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
        console.log("Error in deleteTask Controller", error);
    }
}