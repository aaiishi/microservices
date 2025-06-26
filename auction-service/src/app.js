require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const auctionRouter = require('./routes/auction.routes');

const app = express();
app.use(express.json()); // pour parser le JSON des POST

// Monte le router complet sous /auctions
app.use('/auctions', auctionRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté (auction-service)'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () =>
  console.log(`Auction-Service démarré sur port ${process.env.PORT}`)
);
