import { where } from "sequelize";
import db from "../models/index.cjs";

const getCartItem = async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const [cartItem, totalCartItem] = await Promise.all([
    db.CartItem.findAll({
      limit: pageSize,
      offset: offset,
    }),
    db.CartItem.count(),
  ]);

  res.status(200).json({
    message: "Lấy thanh công",
    data: { cartItem, totalCartItem },
  });
};

const getCartItemById = async (req, res) => {
  const { id } = req.params;

  const cartItemById = await db.CartItem.findByPk(id);
  if (!cartItemById) {
    return res.status(404).json({
      message: "Không tìm thấy ID này",
    });
  }
  res.status(200).json({
    message: "Lấy thành công",
    data: cartItemById,
  });
};

const insertItem = async (req, res) => {
  const { product_id, cart_id, quantity } = req.body;

  const existtingProduct = await db.Product.findOne({
    where: { id: product_id },
  });

  const existtingCardId = await db.Cart.findOne({ where: { id: cart_id } });

  if (existtingCardId || existtingProduct) {
    res.status(400).json({
      message: "Không tồn tại product hoặc cart",
    });
  }

  const existtingCartItem = await db.CartItem.findOne({
    where: {
      cart_id: cart_id,
      product_id: product_id,
    },
  });

  if (existtingCartItem) {
    return res.status(400).json({
      message: "Đã có sản phẩm này trong giỏ hàng",
    });
  }

  if (quantity < 1) {
    return res.status(400).json({
      message: "Số lượng không được để dưới 1",
    });
  }

  const quantityProductDB = await db.Product.findOne({
    where: { id: product_id },
    attributes: ["quantity"],
  });

  if (quantity < quantityProductDB) {
    return res.status(400).json({
      message: "Không đủ số lượng",
    });
  }

  const data = await db.CartItem.create(req.body);

  res.status(201).json({
    message: "Thêm sản phẩm vào giỏ hàng thành công",
    data: data,
  });
};

const deleteItem = async (req, res) => {
  const { id } = params;

  const DeleteItem = await db.CartItem.destroy({ where: { id: id } });
  if (!DeleteItem) {
    return res.status(404).json({
      message: "Không tìm thấy Id",
    });
  }
  res.status(200).json({
    message: "Xoá thành công",
  });
};

const updateItem = async (req, res) => {
  const { id } = params;
  const { product_id, cart_id, quantity } = req.body;

  const existtingProduct = await db.Product.findOne({
    where: { id: product_id },
  });

  const existtingCardId = await db.Cart.findOne({ where: { id: cart_id } });

  if (existtingCardId || existtingProduct) {
    res.status(400).json({
      message: "Không tồn tại product hoặc cart",
    });
  }

  const existtingCartItem = await db.CartItem.findOne({
    where: {
      cart_id: cart_id,
      product_id: product_id,
    },
  });

  if (existtingCartItem) {
    return res.status(400).json({
      message: "Đã có sản phẩm này trong giỏ hàng",
    });
  }

  if (quantity < 1) {
    return res.status(400).json({
      message: "Số lượng không được để dưới 1",
    });
  }

  const quantityProductDB = await db.Product.findOne({
    where: { id: product_id },
    attributes: ["quantity"],
  });

  if (quantity < quantityProductDB) {
    return res.status(400).json({
      message: "Không đủ số lượng",
    });
  }

  const data = await db.CartItem.update(req.body, { where: { id: id } });
  if (data[0]) {
    return res.status(200).json({
      message: "Cập nhật thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tồn tại ",
    });
  }
};

export { getCartItem, getCartItemById, insertItem, deleteItem };
