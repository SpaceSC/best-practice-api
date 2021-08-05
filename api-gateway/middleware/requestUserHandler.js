const jwt = require("jsonwebtoken");

const requestUserHandler = (req, res, next) => {

  console.log("HANDLEEER",process.env.JWT_SECRET);

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