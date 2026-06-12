// src/routes/todo.route.ts
import express from "express";
const router = express.Router();

import TodoCtrl from "../controllers/todo.controller";

router.post("/", TodoCtrl.createTask);
router.get("/", TodoCtrl.getAllTasks);       // Added READ route
router.put("/:id", TodoCtrl.update);         // Added :id param
router.delete("/:id", TodoCtrl.delete);      // Added :id param

export default router;