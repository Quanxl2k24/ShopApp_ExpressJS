import Joi from "joi";
class InsertUser {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.role = data.role;
    this.avatar = data.avatar;
    this.phone = data.phone;
  }
  static validate(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(50).required(),
      name: Joi.string().min(2).max(50).required(),
      role: Joi.number(),
      avatar: Joi.string().uri().optional(),
      phone: Joi.string().optional(),
    });

    return schema.validate(data);
  }
}

export default InsertUser;
