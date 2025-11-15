import { Sequelize, Op, where } from "sequelize";
import db from "../models/index.cjs";

export const getProducts = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;
  let whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { specification: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const [product, totalProducts] = await Promise.all([
    db.Product.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Product.count({
      where: whereClause,
    }),
  ]);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }
  res.status(200).json({
    message: "Lấy sản phẩm thành công",
    data: { product, totalProducts },
  });
};

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  const productById = await db.Product.findByPk(id);
  if (!productById) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm nào có ID này",
    });
  }
  return res.status(200).json({
    message: "Lấy sản phẩm theo ID thành công",
    data: productById,
  });
};

export const insertProduct = async (req, res) => {
  const product = await db.Product.create(req.body);
  return res.status(201).json({
    message: "Thêm sản phẩm thành công",
    data: product,
  });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const UpdateProduct = await db.Product.update(req.body, {
    where: { id: id },
  });
  if (UpdateProduct[0]) {
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm này",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const DeleteProduct = await db.Product.destroy({
    where: { id: id },
  });

  if (DeleteProduct) {
    return res.status(200).json({
      message: "Xoá sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }
};
