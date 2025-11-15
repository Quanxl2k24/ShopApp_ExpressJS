import { Sequelize, where, Op, Model } from "sequelize";
import db from "../models/index.cjs";

const getNewsDetails = async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const [newsDetail, totalNewsDetails] = await Promise.all([
    db.NewsDetail.findAll({
      limit: pageSize,
      offset: offset,
      include: [{ model: db.News }, { model: db.Product }],
    }),
    db.NewsDetail.count(),
  ]);

  return res.status(200).json({
    message: "Lấy thành công NewsDetails",
    data: { newsDetail, totalNewsDetails },
  });
};

const getNewsDetailsById = async (req, res) => {
  const { id } = req.params;
  const data = await db.NewsDetail.findByPk(id, {
    include: [{ model: db.News }, { model: db.Product }],
  });

  if (data) {
    return res.status(200).json({
      message: "Lấy thành công NewsDetails",
      data: data,
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy NewsDetails",
    });
  }
};

const insertNewsDetails = async (req, res) => {
  const { product_id, news_id } = req.body;

  const checkProductId = await db.Product.findOne({
    where: { id: product_id },
  });
  const checkNewsId = await db.News.findOne({
    where: { id: news_id },
  });
  if (checkProductId === null) {
    return res.status(404).json({
      message: "Không tìm thấy Product với product_id này",
    });
  }
  if (checkNewsId === null) {
    return res.status(404).json({
      message: "Không tìm thấy News với news_id này",
    });
  }

  const checkProductIdByNewsDeatails = async (product_id, news_id) => {
    const Check = await db.NewsDetail.findOne({
      where: { product_id: product_id, news_id: news_id },
    });

    if (Check !== null) {
      return true;
    } else {
      return false;
    }
  };
  const exists = await checkProductIdByNewsDeatails(product_id, news_id);
  if (exists) {
    return res.status(409).json({
      message: "Dữ liệu này đã có trong bảng",
    });
  }

  const data = await db.NewsDetail.create(req.body);
  return res.status(201).json({
    message: "Thêm thành công NewsDetails",
    data: data,
  });
};

const updateNewsDetails = async (req, res) => {
  const { id } = req.params;
  const { product_id, news_id } = req.body;

  const checkProductId = await db.Product.findOne({
    where: { id: product_id },
  });
  const checkNewsId = await db.News.findOne({
    where: { id: news_id },
  });
  if (checkProductId === null) {
    return res.status(404).json({
      message: "Không tìm thấy Product với product_id này",
    });
  }
  if (checkNewsId === null) {
    return res.status(404).json({
      message: "Không tìm thấy News với news_id này",
    });
  }

  const checkProductIdByNewsDeatails = async (product_id, news_id) => {
    const Check = await db.NewsDetail.findOne({
      where: { product_id: product_id, news_id: news_id },
    });

    if (Check !== null) {
      return true;
    } else {
      return false;
    }
  };
  const exists = await checkProductIdByNewsDeatails(product_id, news_id);
  if (exists) {
    return res.status(409).json({
      message: "Dữ liệu này đã có trong bảng",
    });
  }

  const update = db.NewsDetail.update(req.body, { where: { id: id } });
  if (update[0]) {
    return res.status(200).json({
      message: "Đã update thành công newsdetails",
    });
  } else {
    return res.status(400).json({
      message: "Update không thành công newsdetails",
    });
  }
};

const deleteNewsDetails = async (req, res) => {
  const { id } = req.params;
  const DeleteNewsDetails = db.NewsDetail.destroy({ where: { id: id } });

  if (DeleteNewsDetails) {
    return res.status(200).json({
      message: "Xoá thành công newsdetails",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy id này",
    });
  }
};

export {
  getNewsDetails,
  getNewsDetailsById,
  insertNewsDetails,
  updateNewsDetails,
  deleteNewsDetails,
};
