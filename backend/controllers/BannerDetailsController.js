import { where } from "sequelize";
import db from "../models/index.cjs";

const getBannerDetails = async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const [BannerDetail, totalBannerDetails] = await Promise.all([
    db.BannerDetail.findAll({
      limit: pageSize,
      offset: offset,
      include: [{ model: db.Banner }, { model: db.Product }],
    }),
    db.BannerDetail.count(),
  ]);
  return res.status(200).json({
    message: "Lấy banner details thành công",
    data: { BannerDetail, totalBannerDetails },
  });
};

const getBannerDetailsById = async (req, res) => {
  const { id } = req.params;
  const data = await db.BannerDetail.findById(id);
  if (data) {
    return res.status(200).json({
      message: "Lấy thành công banner details",
      data: data,
    });
  } else {
    return res.status(404).json({
      message: "Không thấy banner details này",
    });
  }
};

const insertBannerDetails = async (req, res) => {
  const { product_id, banner_id } = req.body;

  const checkProductId = await db.Product.findOne({
    where: { id: product_id },
  });

  const checkBannerId = await db.Banner.findOne({
    where: { id: banner_id },
  });

  if (checkProductId === null) {
    return res.status(404).json({
      message: "Không tìm thấy Product với product_id này",
    });
  }
  if (checkBannerId === null) {
    return res.status(404).json({
      message: "Không tìm thấy Banner với banner_id này",
    });
  }
  const checkProductIdByBannerDeatails = await db.BannerDetail.findOne({
    where: { product_id: product_id, banner_id: banner_id },
  });

  if (checkProductIdByBannerDeatails) {
    return res.status(409).json({
      message: "Dữ liệu này đã có trong bảng",
    });
  }

  const data = await db.BannerDetail.create(req.body);
  return res.status(201).json({
    message: "Thêm thành công BannerDetails",
  });
};

const updateBannerDetails = async (req, res) => {
  const { id } = req.params;
  const { product_id, banner_id } = req.body;
  const checkProductId = await db.Product.findOne({
    where: { id: product_id },
  });

  const checkBannerId = await db.Banner.findOne({
    where: { id: banner_id },
  });
  if (checkProductId === null) {
    return res.status(404).json({
      message: "Không tìm thấy Product với product_id này",
    });
  }
  if (checkBannerId === null) {
    return res.status(404).json({
      message: "Không tìm thấy Banner với banner_id này",
    });
  }

  const checkProductIdByBannerDeatails = await db.BannerDetail.findOne({
    where: { product_id: product_id, banner_id: banner_id },
  });

  if (checkProductIdByBannerDeatails) {
    return res.status(409).json({
      message: "Dữ liệu này đã có trong bảng",
    });
  }

  const update = db.BannerDetail.update(req.body, { where: { id: id } });

  if (update[0]) {
    return res.status(200).json({
      message: "Đã update thành công bannerdetails",
    });
  } else {
    return res.status(400).json({
      message: "Update không thành công bannerdetails",
    });
  }
};

const deleteBannerDetails = async (req, res) => {
  const { id } = req.params;
  const DeleteBannerDetails = db.destroy({ where: { id: id } });
  if (DeleteNewsDetails) {
    return res.status(200).json({
      message: "Xoá thành công bannerdetails",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy id này",
    });
  }
};

export {
  getBannerDetails,
  getBannerDetailsById,
  insertBannerDetails,
  updateBannerDetails,
  deleteBannerDetails,
};
