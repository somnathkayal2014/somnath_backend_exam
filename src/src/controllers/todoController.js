import todoSchema from "../models/todoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await todoSchema.create({
      title: title,
      description: description,
      userId: req.userId,
    });
    if (!newTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      data: newTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodo = async (req, res) => {
  try {
    const allTodo = await todoSchema.find({
      title: title,
      description: description,
      userId: req.userId,
    });
    if (!allTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo fetched Successfully",
      data: newTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
