const Wallet = require('../models/wallets');

exports.createWallet = (req, res, next) => {
    const {walletName, balance, color, author} = req.body;

    const wallet = new Wallet({
        walletName: walletName,
        balance: balance,
        color: color,
        author: {
            id: author.id,
            name: author.name
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
    
    Wallet.find({ "author.id" : user_id })
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
                {"author.id" : user_id},
                {"_id" : id}
            ]
        }
    )
    .then(result => {
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

    Wallet.updateOne(
        { $and: [
                    {"author.id" : user_id},
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
                {"author.id" : user_id},
                {"_id" : id}
            ]
        }
    )
    .then(result => {
        res.status(200).json({
            message: 'Delete Wallet Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

