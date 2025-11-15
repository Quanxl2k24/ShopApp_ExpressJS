import Joi from "joi";

class InsertNewsDetailsRequest {
  constructor(data) {
    this.product_id = data.product_id;
    this.news_id = data.news_id;
  }

  static validate(data) {
    const schema = Joi.object({
      product_id: Joi.number().integer().min(1).required(),
      news_id: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default InsertNewsDetailsRequest;
