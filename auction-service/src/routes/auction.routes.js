const express = require('express');
const ctrl = require('../controllers/auction.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

// publiques
router.get('/',    ctrl.listAuctions);
router.get('/:id', ctrl.getAuction);

// protégées
router.post('/',   auth, ctrl.createAuction);
router.delete('/:id', auth, ctrl.deleteAuction);

module.exports = router;
