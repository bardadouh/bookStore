const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Access denied. Invalid token." });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Access denied: " + error.message });
  }
}

// Verify Token & Authorize the user

function verifyUserAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. You are not allowed" });
    }
  });
}

// Verify Token & Admin

function verifyUserAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. You are not Admin" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyUserAndAuthorization,
  verifyUserAndAdmin,
};
