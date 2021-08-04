const jwt = require("jsonwebtoken");

const requestUserHandler = (req, res, next) => {

  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, verified) {
    if (err) {
      next();
    } else {
      res.locals.user = verified.user_id
      next();
    }
  });

}

module.exports = requestUserHandler