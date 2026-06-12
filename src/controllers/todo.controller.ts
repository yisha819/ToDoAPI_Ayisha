// src/controllers/todo.controller.ts
import { Request, Response } from "express";
import Joi from "joi";
import TodoSvc from "../services/todo.service";

export default class TodoCtrl {
  // CREATE
  static async createTask(req: Request, res: Response) {
    const { title, description } = req.body;

    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    const { error } = schema.validate({ title, description });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await TodoSvc.createTask({ title, description });
      return res.status(201).json({ message: "Task created", data: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // READ
  static async getAllTasks(req: Request, res: Response) {
    try {
      const result = await TodoSvc.getAllTasks();
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    const { title, description, status } = req.body;
    const _id = req.params.id as string;

    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string().valid("active", "completed").optional()
    });

    const { error } = schema.validate({ title, description, status });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await TodoSvc.update({ _id, title, description, status });
      return res.status(200).json({ message: "Task updated", data: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    const _id = req.params.id as string;

    try {
      const result = await TodoSvc.delete(_id);
      return res.status(200).json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}