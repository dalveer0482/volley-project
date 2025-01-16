import { Cart } from "../../models/index.js";

export default async (req, res, next) => {
  try {
    const { body } = req;

    if (!body?.id) {
      return res.status(400).json({
        message: "Invalid Data",
      });
    }

    const cart = await Cart.findOneAndUpdate({ id: body.id }, { ...body });

    return res.json({
      message: "cart added successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
