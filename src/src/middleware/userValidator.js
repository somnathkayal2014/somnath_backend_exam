import mongoose from "mongoose";
import yup from "yup";

export const userValidateSchema = yup.object({
  username: yup.string().trim().min(3, "username using atleast three words"),
  email: yup.string().nullable().email("Enter Correct Email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
      "Password must have 8+ characters, one uppercase, one number, and one special character.",
    )
    .required("Password is required"),
});

export const validateUser = (Schema) => async (req, res, next) => {
  try {
    await Schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
