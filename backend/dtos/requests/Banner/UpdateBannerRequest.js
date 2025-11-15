import Joi from "joi";

class UpdateBannerRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.status = data.status;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      image: Joi.string().optional(),
      status: Joi.number().integer().optional(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default UpdateBannerRequest;
