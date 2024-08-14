const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const transactionsController = require('../controllers/transactions');

//create => POST
router.post('/transaction', [
    body('trxNote').isLength({min: 5}).withMessage('Note must be at least 5 characters')],
    transactionsController.createTransaction);

//read => GET
router.get('/transactions', transactionsController.getAllTransactions);
router.get('/transaction?', transactionsController.getTransactionById);

//update => PUT
router.put('/transaction?', [
        body('trxNote').isLength({min: 5}).withMessage('Note must be at least 5 characters')],
        transactionsController.updateTransaction);

//delete => DELETE
router.delete('/transaction?', transactionsController.deleteTransaction);

module.exports = router;