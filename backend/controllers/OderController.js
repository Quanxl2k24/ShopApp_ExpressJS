import { Sequelize, Op, where } from "sequelize";
import db from "../models/index.cjs";

const getOrder = async (req, res) => {
  const { page = 1 } = req.params;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const [order, totalOrder] = await Promise.all([
    db.Order.findAll({
      limit: pageSize,
      offset: offset,
    }),
    db.Order.count(),
  ]);
  return res.status(200).json({
    message: "Lấy thành công order",
    data: { order, totalOrder },
  });
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const orderById = await db.Order.findByPk(id);
  if (orderById) {
    return res.status(200).json({
      message: "Lấy thành công order",
      data: orderById,
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy order",
    });
  }
};

const insertOrder = async (req, res) => {
  const { user_id } = req.body;
  const checkUserId = await db.User.findByPk(user_id);

  if (!checkUserId) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
    });
  }

  const order = await db.Order.create(req.body);
  return res.status(201).json({
    message: "Thêm thành công order",
    data: order,
  });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const UpdateOrder = await db.Order.update(req.body, {
    where: { id: id },
  });

  if (UpdateOrder[0]) {
    return res.status(200).json({
      message: "Cập nhật thành công order",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy order",
    });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const DeleteOrder = await db.Order.destroy({ where: { id: id } });
  if (DeleteOrder) {
    return res.status(200).json({
      message: "Xoá thành công order",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy order",
    });
  }
};

export { getOrder, insertOrder, getOrderById, updateOrder, deleteOrder };
