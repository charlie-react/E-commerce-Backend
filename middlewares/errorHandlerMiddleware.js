const SelfApiError = require("../ErrFolder/custom-api");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof SelfApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
