require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bidRouter = require('./routes/bid.routes');

const app = express();
app.use(express.json());
app.use('/bids', bidRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté (bid-service)'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () =>
  console.log(`Bid-Service démarré sur port ${process.env.PORT}`)
);
