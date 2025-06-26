require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/error.handler');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connecté (user-service)'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () =>
  console.log(`User-Service sur le port ${process.env.PORT}`)
);
