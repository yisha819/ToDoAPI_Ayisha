// src/services/todo.service.ts
import TodoRepo from "../repositories/todo.repository";

type TTodoCreate = { title: string; description: string };
type TTodoUpdate = { _id: string; title: string; description: string; status?: string };

export default class TodoSvc {
  // CREATE
  static createTask(task: TTodoCreate) {
    return TodoRepo.createTask(task);
  }

  // READ
  static getAllTasks() {
    return TodoRepo.getAllTasks();
  }

  // UPDATE
  static update(task: TTodoUpdate) {
    return TodoRepo.update(task);
  }

  // DELETE
  static delete(_id: string) {
    return TodoRepo.delete(_id);
  }
}