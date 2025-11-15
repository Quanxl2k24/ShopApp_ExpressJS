import { Sequelize, where } from "sequelize";
import db from "../models/index.cjs";

const getBanner = async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;
  const whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  const [Banner, totalBanner] = await Promise.all([
    db.Banner.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Banner.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Lấy thành công banner",
    data: { Banner, totalBanner },
  });
};

const getBannerById = async (req, res) => {
  const { id } = req.params;
  const data = await db.Banner.findByPk(id);

  if (!data) {
    return res.status(404).json({
      message: "Không tìm thấy Banner",
    });
  } else {
    return res.status(200).json({
      message: "Lấy thành công banner",
      data: data,
    });
  }
};

const insertBanner = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const banner = await db.Banner.create(req.body, { transaction });

    const productIds = req.body.product_ids;
    if (productIds && productIds.length) {
      const validProducts = await db.Product.findAll({
        where: {
          id: productIds,
        },
        transaction,
      });

      const validProductIds = validProducts.map((product) => product.id);

      const bannerDetailsPromises = validProductIds.map((id) => {
        return db.BannerDetail.create(
          {
            product_id: id,
            banner_id: banner.id,
          },
          { transaction }
        );
      });

      await Promise.all(bannerDetailsPromises);
    }
    await transaction.commit();
    return res.status(201).json({
      message: "Thêm thành công",
      data: banner,
    });
  } catch (error) {

    await transaction.rollback();
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateBanner = async (req, res) => {
  const { id } = req.params;
  const update = await db.Banner.update(req.body, { where: { id: id } });
  if (update[0]) {
    return res.status(200).json({
      message: "Update thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy banner",
    });
  }
};

const deleteBanner = async (req, res) => {
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();
  try {
    await db.BannerDetail.destroy({ where: { banner_id: id } }, transaction());
    const deleteBanner = await db.BannerDetail.destroy(
      {
        where: { id: id },
      },
      transaction()
    );

    if (deleteBanner) {
      await transaction.commit();
      return res.status(200).json({
        message: "Xoá thành công banner",
      });
    } else {
      await transaction.rollback();
      return res.status(404).json({
        message: "Không tìmm thấy banner này",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

export { getBanner, getBannerById, insertBanner, updateBanner, deleteBanner };
