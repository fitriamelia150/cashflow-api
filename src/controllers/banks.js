const {validationResult} = require('express-validator');
const Bank = require('../models/banks');

exports.createBank = (req, res, next) => {

    const { userId, userName, bankName, bankBalance } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Validation Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const bank = new Bank({
        bankName: bankName,
        bankBalance: bankBalance,
        user: {
            id: userId,
            name: userName
        }
    });

    bank.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Bank Success',
            data: result
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}

exports.getAllBanks = (req, res, next) => {
    const user_id = req.query.userId;

    Bank.find({"user.id": user_id})
    .then(result => {
        res.status(200).json({
            message: 'Get All Banks Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBankById = (req, res, next) => {
    const id = req.query.id;
    const user_id = req.query.userId;

    Bank.findOne(
        { $and: [
                    {"user.id" : user_id},
                    {"_id" : id}
                ]
        }
    )
    .then(result => {
        if(result === null){
            const error = new Error('Bank not found');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Get Bank Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateBank = (req, res, next) => {
    const { userId, userName, bankName, bankBalance } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Validation Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const id = req.query.id;
    const user_id = req.query.userId;

    Bank.findOne(
        { $and: [
                    {"user.id" : user_id},
                    {"_id" : id}
                ]
        }
    )
    .then(bank => {
        
        if(bank === null){
            const error = new Error('Bank not found');
            error.errorStatus = 404;
            throw error;
        }

        bank.bankName = bankName;
        bank.bankBalance = bankBalance;

        return bank.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Bank Success',
            data: result
        })
    })
    .catch(err => {

        if(err.message.includes('Cast to ObjectId failed')){
            err.message = 'Bank not found or Invalid ID';
            err.errorStatus = 404;
        }

        next(err);
    })
}

exports.deleteBank = (req, res, next) => {
    const id = req.query.id;
    const user_id = req.query.userId;

    Bank.findOne(
        { $and:[   
                    {"user.id" : user_id},
                    {"_id" : id}
                ]
        }    
    )
    .then(bank => {
        console.log(bank);

        if(bank === null) {
            const error = new Error('Bank not found');
            error.errorStatus = 404;
            throw error;
        }

        return Bank.findByIdAndDelete(id);
    })
    .then(result => {
        res.status(200).json({
            message: 'Delete Bank Success',
            data: {}
        })
    })
    .catch(err => {
        if(err.message.includes('Cast to ObjectId failed')){
            err.message = 'Bank not found or Invalid ID';
            err.errorStatus = 404;
        }

        next(err);
    })

}