// error is displayed as html File in (postman) to display in particular format we write this


const notFound = (req, res, next) => {
    // req url mot present
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
    // checks wht error is thrown by server and changes it to structured form
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports={ notFound , errorHandler }