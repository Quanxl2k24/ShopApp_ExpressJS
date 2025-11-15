import { Sequelize, Op, where } from "sequelize";
import db from "../models/index.cjs";

export const getBrands = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  const [brand, totalBrands] = await Promise.all([
    db.Brand.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),

    db.Brand.count({
      where: whereClause,
    }),
  ]);
  res.status(200).json({
    message: "Lấy các nhãn hàng thành công",
    data: { brand, totalBrands },
  });
};

export const insertBrand = async (req, res) => {
  const brand = await db.Brand.create(req.body);
  res.status(201).json({
    message: "Thêm nhãn hàng thành công",
    data: brand,
  });
};

export const getBrandById = async (req, res) => {
  const { id } = req.params;
  const brandById = await db.Brand.findByPk(id);
  if (!brandById) {
    return res.status(404).json({
      message: "Không tìm thấy thương hiệu theo ID",
    });
  }
  res.status(200).json({
    message: "Lấy sản phẩm theo ID thành công",
    data: brandById,
  });
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const UpdateBrand = await db.Brand.update(req.body, {
    where: { id },
  });

  if (UpdateBrand[0]) {
    return res.status(200).json({
      message: "Cập nhật nhãn hàng thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy nhãn hàng",
    });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  const DeleteBrand = await db.Brand.destroy({
    where: { id: id },
  });

  if (DeleteBrand) {
    return res.status(200).json({
      message: "Xoá nhãn hàng thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy nhãn hàng này",
    });
  }
};
