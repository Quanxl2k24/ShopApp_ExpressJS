import Joi from "joi";

class InsertProductReqest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.price = data.price;
    this.oldprice = data.oldprice;
    this.description = data.description;
    this.specification = data.specification;
    this.buyturn = data.buyturn;
    this.quantity = data.quantity;
    this.brand_id = data.brand_id;
    this.category_id = data.category_id;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().required(),
      price: Joi.number().positive().required(),
      oldprice: Joi.number().positive().optional(),
      description: Joi.string().allow("").optional(),
      specification: Joi.string().allow("").optional(),
      buyturn: Joi.number().integer().min(0).optional(),
      quantity: Joi.number().integer().min(0).required(),
      brand_id: Joi.number().integer().required(),
      category_id: Joi.number().integer().required(),
    });
    return schema.validate(data);
  }
}

export default InsertProductReqest;
