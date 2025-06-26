const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  auctionId: { type: mongoose.Types.ObjectId, required: true, ref: 'Auction' },
  userId:    { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  amount:    { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);
