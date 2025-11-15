import Joi from "joi";

class InsertBannerRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.status = data.status;
    this.product_ids = data.product_ids;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().optional(),
      status: Joi.number().integer().required(),
      product_ids: Joi.array().items(Joi.number().integer()).min(1).required(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default InsertBannerRequest;
