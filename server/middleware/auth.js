const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get raw authorization header
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  // split token from the Authorization header
  const token = bearer.split('Bearer ')[1].trim();

  // Verify token
  let payload;
  try {
    let privatekey = 'secrettoken';
    jwt.verify(token, privatekey, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
