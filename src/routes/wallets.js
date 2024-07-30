const express = require('express');

const router = express.Router();

const walletsController = require('../controllers/wallets');

//create => POST
router.post('/wallet', walletsController.createWallet);
//read => GET
router.get('/wallets', walletsController.getAllWallets);

module.exports = router;