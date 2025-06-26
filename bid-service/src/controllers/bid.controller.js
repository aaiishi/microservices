const Bid = require('../models/bid.model');
const Auction = require('../models/auction.model'); // import local

exports.placeBid = async (req, res, next) => {
  try {
    const { auctionId, amount } = req.body;
    const auc = await Auction.findById(auctionId);
    if (!auc) return res.status(404).json({ message: 'Enchère inexistante' });
    if (amount <= auc.currentPrice) {
      return res.status(400).json({ message: 'Montant trop petit' });
    }
    auc.currentPrice = amount;
    await auc.save();

    const bid = await new Bid({ auctionId, userId: req.userId, amount }).save();
    res.status(201).json(bid);
  } catch (err) { next(err); }
};

exports.getBidsByAuction = async (req, res, next) => {
  try {
    const bids = await Bid.find({ auctionId: req.params.auctionId });
    res.json(bids);
  } catch (err) { next(err); }
};

exports.getBidsByUser = async (req, res, next) => {
  try {
    const bids = await Bid.find({ userId: req.params.userId });
    res.json(bids);
  } catch (err) { next(err); }
};
