const express = require('express');
const ctrl = require('../controllers/bid.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

// toutes protégées
router.post('/',              auth, ctrl.placeBid);
router.get('/auction/:auctionId', auth, ctrl.getBidsByAuction);
router.get('/user/:userId',    auth, ctrl.getBidsByUser);

module.exports = router;
