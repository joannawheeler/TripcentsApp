var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1];
    var verified = jwt.verify(token, process.env.JWT_KEY);
    req.userData = verified;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authorization failed'
    });
  }
};