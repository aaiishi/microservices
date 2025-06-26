require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  try {
    const { sub } = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    req.userId = sub;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide' });
  }
};
