const logger = (req, res, next) => {
  console.log(
    "Middleware: ",
    req.method,
    req.url,
    req.params,
    req.protocol,
    "://",
    req.get("host"),
    req.originalUrl
  );
  next();
};
module.exports = logger;