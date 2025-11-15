const validateMiddleware = (typeRequest) => {
  return (req, res, next) => {
    const { error } = typeRequest.validate(req.body);
    if (error != null) {
      return res.status(400).json({
        message: "Validate Error",
        error: error.details[0].message,
      });
    }
    next();
  };
};

export default validateMiddleware;
