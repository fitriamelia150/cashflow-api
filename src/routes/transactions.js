const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const transactionsController = require('../controllers/transactions');

//create => POST
router.post('/transaction', [
    body('trxNote').isLength({min: 5})],
    transactionsController.createTransaction);

// router.post('/transaction', transactionsController.createTransaction);

module.exports = router;