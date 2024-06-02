class HttpError {
  statusCode = 500;
  message = "Internal Server Error";
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports=HttpError;