import Joi from "joi";

class InsertCartScheme {
  constructor(data) {
    this.used_id = data.used_id;
    this.session_id = data.session_id;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer(),
      session_id: Joi.string().optional(),
    });
    return schema.validate(data);
  }
}

export default InsertCartScheme;
