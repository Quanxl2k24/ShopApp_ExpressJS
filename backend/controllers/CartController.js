import { Sequelize, where } from "sequelize";
import db from "../models/index.cjs";
const getCart = async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;
  const [carts, totalCart] = await Promise.all([
    db.Cart.findAll({
      limit: pageSize,
      offset: offset,
    }),
    db.Cart.count(),
  ]);
  res.status(200).json({
    message: "Lấy thành công",
    data: {
      carts,
      totalCart,
    },
  });
};

const getCartById = async (req, res) => {
  const { id } = req.params;
  const cartById = await db.Cart.findByPk(id);
  if (!cartById) {
    return res.status(404).json({
      message: "Không tìm thấy danh mục theo Id",
    });
  }

  res.status(200).json({
    message: "Lấy theo id thành công",
    data: cartById,
  });
};

const insertCart = async (req, res) => {
  const { session_id, user_id } = req.body;

  if ((!session_id && !user_id) || (session_id && user_id)) {
    return res.status(400).json({
      message:
        "Chỉ được cung cấp một trong hai giá trị session_id hoặc là user_id",
    });
  }

  const whereClause = session_id
    ? { session_id: session_id }
    : { user_id: user_id };

  const checkExist = await db.Cart.findOne({
    where: whereClause,
  });

  if (checkExist) {
    return res.status(409).json({
      message: session_id
        ? "Session_id này đã tồn tại"
        : "User_id này đã tồn tại",
    });
  }

  const cart = await db.Cart.create(req.body);

  res.status(201).json({
    message: "Thêm thành công sản phẩm vào giỏ",
    data: cart,
  });
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  const DeleteCart = await db.Cart.destroy({ where: { id: id } });
  console.log(">>>>>>", DeleteCart);

  if (!DeleteCart) {
    return res.status(404).json({
      message: "Không tồn tại id này",
    });
  }

  res.status(200).json({
    message: "Xoá toàn bộ giỏ hàng thành công",
  });
};

export { getCart, getCartById, insertCart, deleteCart };
