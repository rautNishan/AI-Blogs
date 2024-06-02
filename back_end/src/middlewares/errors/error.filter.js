const HttpError = require("../../utils/ErrorClass/HttpError");

const GlobalErrorFilter = async (err, req, res, next) => {
  if (err instanceof HttpError) {
    const responseObject = {
      date: new Date(),
      path: req.path,
      statusCode: err.statusCode,
      message: err.message,
    };
    res.send(responseObject);
  } else {
    res.send({
      date: new Date(),
      path: req.path,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
  next();
};

module.exports = GlobalErrorFilter;
