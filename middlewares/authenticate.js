const { jwt, cookie } = require('../utils');

const authenticate = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token);
    next();
  } catch {
    cookie.clear(res);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
