import express from "express";
import { createTodo, getTodo } from "../controllers/todoController.js";

const todoRoute = express.Router();

todoRoute.post("/create", createTodo);
todoRoute.get("/getall", getTodo);

export default todoRoute;
