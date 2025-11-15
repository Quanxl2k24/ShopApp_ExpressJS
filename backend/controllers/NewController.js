import { Sequelize, where, Op } from "sequelize";
import db from "../models/index.cjs";

const insertNews = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const news = await db.News.create(req.body, { transaction });

    const productIds = req.body.product_ids;

    if (productIds && productIds.length) {
      const validProducts = await db.Product.findAll({
        where: {
          id: productIds,
        },
        transaction,
      });

      const validProductIds = validProducts.map((product) => product.id);

      const newDetailsPromises = validProductIds.map((id) => {
        return db.NewsDetail.create(
          {
            product_id: id,
            news_id: news.id,
          },
          { transaction }
        );
      });

      await Promise.all(newDetailsPromises);
    }
    await transaction.commit();
    return res.status(201).json({
      message: "Thêm thành công",
      data: news,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getNews = async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;
  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    };
  }
  const [news, totalNews] = await Promise.all([
    db.News.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.News.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Lấy thành công news",
    data: { news, totalNews },
  });
};

const getNewsById = async (req, res) => {
  const { id } = req.params;
  const newsById = await db.News.findByPk(id);

  if (newsById) {
    return res.status(200).json({
      message: "Lấy thành công news",
      data: newsById,
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy news",
    });
  }
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const update = await db.News.update(req.body, { where: { id: id } });
  if (update[0]) {
    return res.status(200).json({
      message: "Cập nhật thành công News",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy News",
    });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();
  try {
    await db.NewsDetail.destroy({ where: { news_id: id } }, transaction);

    const DeleteNews = await db.News.destroy(
      { where: { id: id } },
      transaction
    );
    if (DeleteNews) {
      await transaction.commit();
      return res.status(200).json({
        message: "Xoá thành công news",
      });
    } else {
      await transaction.rollback();
      return res.status(404).json({
        message: "Không tìm thấy news",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Internal Server Error",
      errors: error.message,
    });
  }
};

export { insertNews, getNews, getNewsById, updateNews, deleteNews };
