import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await userSchema.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email Already Registered",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "user Register Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email Not Registered",
      });
    } else {
      const passcheck = await bcrypt.compare(password, user.password);
      if (!passcheck) {
        return res.status(401).json({
          success: false,
          message: "Incorrect Password!",
        });
      } else if (passcheck) {
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY,
          { expiresIn: "10days" },
        );
        return res.status(200).json({
          accessToken: accessToken,
          success: true,
          message: "Hurray !",
          data: user,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
