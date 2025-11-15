import Joi from "joi";

class InsertBannerDetailsRequest {
  constructor(data) {
    this.product_id = data.product_id;
    this.banner_id = data.banner_id;
  }

  static validate(data) {
    const schema = Joi.object({
      product_id: Joi.number().integer().min(1).required(),
      banner_id: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default InsertBannerDetailsRequest;
