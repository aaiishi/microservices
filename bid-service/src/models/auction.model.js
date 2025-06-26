const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  description:   { type: String },
  startingPrice: { type: Number, required: true },
  currentPrice:  { type: Number, default: 0 },
  endsAt:        { type: Date,   required: true },
  ownerId:       { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  status:        { type: String, enum: ['pending','live','ended'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Auction', AuctionSchema);
