const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const banksController = require('../controllers/banks');

//create => POST
router.post('/bank', [
        body('bankName').isLength({min: 3}).withMessage('Name must be at least 3 characters'),
        body('bankBalance').isNumeric().withMessage('Balance must be a number'),
    ], 
    banksController.createBank);

//read => GET
router.get('/banks', banksController.getAllBanks);
router.get('/bank?', banksController.getBankById);

//update => PUT
router.put('/bank?', [
        body('bankName').isLength({min: 3}).withMessage('Name must be at least 3 characters'),
        body('bankBalance').isNumeric().withMessage('Balance must be a number'),
    ],
    banksController.updateBank);

//delete => DELETE
router.delete('/bank?', banksController.deleteBank);

module.exports = router;