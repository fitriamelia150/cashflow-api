const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const walletsController = require('../controllers/wallets');

//create => POST
router.post('/wallet', 
    [
        body('walletName').isLength({min: 5}).withMessage('Wallet Name must be at least 5 characters')
    ], 
    walletsController.createWallet);

//read => GET
router.get('/wallet-all?', walletsController.getAllWallets);
router.get('/wallet?', walletsController.getWalletById);

//update => PUT
router.put('/wallet?', 
    [
        body('walletName').isLength({min: 5}).withMessage('Wallet Name must be at least 5 characters')
    ], 
    walletsController.updateWallet);

//delete => DELETE
router.delete('/wallet?', walletsController.deleteWallet);

module.exports = router;