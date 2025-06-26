module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Email déjà utilisé' });
  }
  res.status(500).json({ message: 'Erreur serveur' });
};
