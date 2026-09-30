import express from "express";
import { login, register } from "../controllers/userController.js";
import {
  userValidateSchema,
  validateUser,
} from "../middleware/userValidator.js";

const userRoute = express.Router();

userRoute.post("/register", validateUser(userValidateSchema), register);
userRoute.get("/login", login);
export default userRoute;
