import Joi from "joi";

class UpdateProductReqest {
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
      name: Joi.string().optional(),
      image: Joi.string().optional(),
      price: Joi.number().positive().optional(),
      oldprice: Joi.number().positive().optional(),
      description: Joi.string().allow("").optional(),
      specification: Joi.string().allow("").optional(),
      buyturn: Joi.number().integer().min(0).optional(),
      quantity: Joi.number().integer().min(0).optional(),
      brand_id: Joi.number().integer().optional(),
      category_id: Joi.number().integer().optional(),
    });
    return schema.validate(data);
  }
}

export default UpdateProductReqest;
