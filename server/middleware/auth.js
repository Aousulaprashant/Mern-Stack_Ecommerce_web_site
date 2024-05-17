const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(400).json({ msg: "ivalid Authontication" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "invalid Authontication" });

      req.user = user;

      next();
    });
  } catch (err) {
    res.status(500).json({ msg: "invalid authonticatinnn" });
  }
};

module.exports = auth;
