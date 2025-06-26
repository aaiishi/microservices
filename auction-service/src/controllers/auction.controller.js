const Auction = require('../models/auction.model');

exports.createAuction = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      ownerId: req.userId,
      currentPrice: req.body.startingPrice
    };
    const auc = await new Auction(data).save();
    res.status(201).json(auc);
  } catch (err) { next(err); }
};

exports.listAuctions = async (req, res, next) => {
  try {
    const all = await Auction.find();
    res.json(all);
  } catch (err) { next(err); }
};

exports.getAuction = async (req, res, next) => {
  try {
    const auc = await Auction.findById(req.params.id);
    if (!auc) return res.status(404).json({ message: 'Non trouvé' });
    res.json(auc);
  } catch (err) { next(err); }
};

exports.deleteAuction = async (req, res, next) => {
  try {
    const auc = await Auction.findById(req.params.id);
    if (!auc) return res.status(404).json({ message: 'Non trouvé' });
    if (auc.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Pas le propriétaire' });
    }
    await auc.remove();
    res.status(204).end();
  } catch (err) { next(err); }
};
