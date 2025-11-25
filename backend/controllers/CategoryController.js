import { Sequelize, where } from "sequelize";
import db from "../models/index.cjs";

export const insertCategory = async (req, res) => {
  const category = await db.Category.create(req.body);
  res.status(201).json({
    message: "Thêm loại sản phẩm thành công",
    data: category,
  });
};

export const getCategory = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;
  let whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  const [category, totalCategory] = await Promise.all([
    db.Category.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Category.count({
      where: whereClause,
    }),
  ]);
  res.status(200).json({
    message: "Lấy thành công",
    data: { category, totalCategory },
  });
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const categoryById = await db.Category.findByPk(id);
  if (!categoryById) {
    return res.status(404).json({
      message: "Không tìm thấy danh mục theo Id",
    });
  }
  res.status(200).json({
    message: "Lấy theo ID thành công",
    data: categoryById,
  });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  const UpdateCategory = await db.Category.update(req.body, {
    where: { id: id },
  });

  if (UpdateCategory[0]) {
    return res.status(200).json({
      message: "Cập nhật thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy danh mục này",
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const DeleteCategory = await db.Category.destroy({
    where: { id: id },
  });

  if (DeleteCategory) {
    return res.status(200).json({
      message: "Xoá thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy danh mục",
    });
  }
};
