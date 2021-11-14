const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.Header("Authorization");
  if (!authHeader) {
    const error = new Error("Token missing");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      const error = new Error("Token missing");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user.id;
        next();
      } catch {
        const error = new Error("Invalid token");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
