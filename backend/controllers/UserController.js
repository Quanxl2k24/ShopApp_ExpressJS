import { Sequelize, Op, where } from "sequelize";
import db from "../models/index.cjs";
import ResponseUser from "../dtos/responses/User/responseUser.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
let SALT = parseInt(process.env.SALT);
const salt = bcrypt.genSaltSync(SALT);

export const getUser = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        {
          name: { [Op.like]: `%${search}%` },
        },
      ],
    };
  }

  const [user, totalUser] = await Promise.all([
    db.User.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
      attributes: { exclude: ["password"] },
    }),

    db.User.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy thông tin người dùng thành công",
    data: { user, totalUser },
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "Không tìm thấy người dùng này",
    });
  } else {
    return res.status(200).json({
      message: "Lấy người dùng thành công",
      data: new ResponseUser(user),
    });
  }
};

export const insertUser = async (req, res) => {
  const { email } = req.body;
  const CheckEmail = await db.User.findOne({ where: { email: email } });
  if (CheckEmail) {
    return res.status(409).json({
      message: "email này đã tồn tại",
    });
  }

  const { password } = req.body;
  const hash = bcrypt.hashSync(password, salt);
  const data = { ...req.body, password: hash };

  const user = await db.User.create(data);
  return res.status(201).json({
    message: "Thêm người dùng thành công",
    data: new ResponseUser(user),
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const UpdateUser = await db.User.update(req.body, { where: { id: id } });
  if (UpdateUser[0]) {
    return res.status(200).json({
      message: "Update người dùng thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy người dùng",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const DeteleUser = await db.User.destroy({
    where: { id: id },
  });

  if (DeteleUser) {
    return res.status(200).json({
      message: "Xoá người dùng thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy người dùng",
    });
  }
};
