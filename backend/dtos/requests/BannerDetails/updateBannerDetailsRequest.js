import Joi from "joi";

class UpdateBannerDetailsRequest {
  constructor(data) {
    this.product_id = data.product_id;
    this.banner_id = data.banner_id;
  }

  static validate(data) {
    const schema = Joi.object({
      product_id: Joi.number().integer().min(1).optional(),
      banner_id: Joi.number().integer().min(1).optional(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default UpdateBannerDetailsRequest;
