import Joi from "joi";

class InsertOrder {
  constructor(data) {
    this.user_id = data.user_id;
    this.status = data.status;
    this.note = data.note;
    this.total = data.total;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().required().messages({
        "number.base": "user_id phải là số",
        "number.integer": "user_id phải là số nguyên",
        "any.required": "user_id là bắt buộc",
      }),
      status: Joi.number().integer().required().messages({
        "number.base": "status phải là số",
        "number.integer": "status phải là số nguyên",
        "any.required": "status là bắt buộc",
      }),
      note: Joi.string().allow(null, "").messages({
        "string.base": "note phải là chuỗi",
      }),
      total: Joi.number().integer().required().messages({
        "number.base": "total phải là số",
        "number.integer": "total phải là số nguyên",
        "any.required": "total là bắt buộc",
      }),
    });

    return schema.validate(data);
  }
}

export default InsertOrder;
