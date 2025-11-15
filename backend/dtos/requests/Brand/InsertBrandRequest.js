import Joi from "joi";

class InsertBrandRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string(),
    });

    return schema.validate(data);
  }
}

export default InsertBrandRequest;
