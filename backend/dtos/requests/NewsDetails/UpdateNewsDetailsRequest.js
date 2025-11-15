import Joi from "joi";

class UpdateNewsDetailsRequest {
  constructor(data) {
    this.product_id = data.product_id;
    this.news_id = data.news_id;
  }

  static validate(data) {
    const schema = Joi.object({
      product_id: Joi.number().integer().min(1).optional(),
      news_id: Joi.number().integer().min(1).optional(),
    });

    return schema.validate(data);
  }
}

export default UpdateNewsDetailsRequest;
