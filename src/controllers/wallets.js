const {validationResult} = require('express-validator');
const Wallet = require('../models/wallets');

exports.createWallet = (req, res, next) => {
    const {walletName, balance, color, user} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Validation Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const wallet = new Wallet({
        walletName: walletName,
        balance: balance,
        color: color,
        user: {
            id: user.id,
            name: user.name
        }
    });

    wallet.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Wallet Success',
            data: result
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.getAllWallets = (req, res, next) => {

    const user_id = req.query.userId;
    
    Wallet.find({ "user.id" : user_id })
    .then(result => {

        res.status(200).json({
            message: "Get All Wallets Success Cin",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getWalletById = (req, res, next) => {

    const id = req.query.id;
    const user_id = req.query.userId;

    Wallet.findOne(
        {
            $and: [
                {"user.id" : user_id},
                {"_id" : id}
            ]
        }
    )
    .then(result => {

        if(result === null) {
            const error = new Error('Wallets not found');
            error.errorStatus = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Get Wallet Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateWallet = (req, res, next) => {
    const id = req.query.id;
    const user_id = req.query.userId;

    const {walletName, balance, color} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Validation Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    Wallet.updateOne(
        { $and: [
                    {"user.id" : user_id},
                    {"_id" : id}
                ]
        },
        { 
            walletName: walletName, 
            balance: balance, 
            color: color 
        }
    )
    .then(result => {
        res.status(200).json({
            message: 'Update Wallet Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteWallet = (req, res, next) => {
    const id = req.query.id;
    const user_id = req.query.userId;

    Wallet.deleteOne(
        {
            $and: [
                {"user.id" : user_id},
                {"_id" : id}
            ]
        }
    )
    .then(result => {
        if(result === null) {
            const error = new Error('Wallets not found');
            error.errorStatus = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Delete Wallet Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

