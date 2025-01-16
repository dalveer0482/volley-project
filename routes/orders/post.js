import { Orders } from "../../models/index.js";

export default async (req, res, next) => {
  try {
    const { body } = req;

    const order = await new Orders(body).save();

    return res.json({
      message: "order added successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
