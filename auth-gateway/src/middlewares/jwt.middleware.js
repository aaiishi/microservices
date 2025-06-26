require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  const token = auth.split(' ')[1];
  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = sub;
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
