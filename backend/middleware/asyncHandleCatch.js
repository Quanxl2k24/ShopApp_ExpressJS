const asyncHandleCatch = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal Server Error",
        errors: error.message,
      });
    }
  };
};

export default asyncHandleCatch;
