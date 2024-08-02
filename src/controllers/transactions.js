const {validationResult} = require('express-validator');
const Transaction = require('../models/transactions');

exports.createTransaction = (req, res, next) => {

    const { userId, userName, trxDate, bankFrom, trxType, trxName, trxVia, trxAmount, trxNote, trxColor } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Validation Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const transaction = new Transaction({
        trxName: trxName,
        trxDate: trxDate,
        trxAmount: trxAmount,
        trxVia: trxVia,
        trxType: trxType,
        trxNote: trxNote,
        bankFrom: bankFrom,
        author: {
            id: userId,
            name: userName
        }
    });

    transaction.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Transaction Success',
            data: result
        });
    })
    .catch( err => {
        console.log(err);
        next(err);
    });
    
}

exports.getAllTransactions = (req, res, next) => {
    const user_id = req.query.userId;
    
    Transaction.find(
        { $and: [
                    {"author.id" : user_id}
                ]
        }
    )
    .then(result => {
        res.status(200).json({
            message: 'Get All Transactions Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getTransactionById = (req, res, next) => {
    const id = req.query.id;
    const user_id = req.query.userId;

    Transaction.findOne(
        { $and: [
                    {"author.id" : user_id},
                    {"_id" : id}
                ]
        }
    )
    .then(result => {

        console.log(result);

        if(!result){
            const error = new Error('Transaction not found');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Get Transaction Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateTransaction = (req, res, next) => {
    const { trxDate, bankFrom, trxType, trxName, trxVia, trxAmount, trxNote, trxColor } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Validation Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const id = req.query.id;
    const user_id = req.query.userId;

    Transaction.findOne(
        { $and: [
                    {"author.id" : user_id},
                    {"_id" : id}
                ]
        }
    )
    .then(trx => {

        console.log(trx);

        if(!trx){
            const err = new Error('Transaction not found');
            err.errorStatus = 404;
            throw err;
        }

        trx.trxName = trxName;
        trx.trxDate = trxDate;
        trx.trxAmount = trxAmount;
        trx.trxVia = trxVia;
        trx.trxType = trxType;
        trx.trxNote = trxNote;
        trx.bankFrom = bankFrom;

        return trx.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Transaction Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteTransaction = (req, res, next) => {
    const id = req.query.id;
    const user_id = req.query.userId;

    Transaction.findOne(
        { $and: [
                    {"author.id" : user_id},
                    {"_id" : id}
                ]
        }
    )
    .then(trx => {
        if(!trx){
            const err = new Error('Transaction not found');
            err.errorStatus = 404;
            throw err;
        }

        return Transaction.findByIdAndDelete(id);
    })
    .then(result => {
        res.status(200).json({
            message: 'Delete Transaction Success',
            data: {}
        })
    })
    .catch(err => {
        next(err);
    })
}