// src/routes/index.ts
import express from "express";
import todoRoutes from "./todo.route";

const router = express.Router();

router.get("/v1", (_, res) => {
  res.json({
    message: "Welcome to my API",
  });
});

// Mount the todo routes
router.use("/todos", todoRoutes);

export default router;