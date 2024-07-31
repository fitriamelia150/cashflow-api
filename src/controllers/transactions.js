const {validationResult} = require('express-validator');

exports.createTransaction = (req, res, next) => {

    const { userId, trxDate, bankFrom, trxType, trxName, trxVia, trxAmount, trxNote, trxColor } = req.body;

    const errors = validationResult(req);

    console.log(errors);

    if(!errors.isEmpty()){
        res.status(400).json({
            message: 'Request Error',
            data: null
        })
    }

    const result = {
        message: 'Create Transaction Success',
        data: {
            id: 12,
            trxName: trxName,
            trxAmount: trxAmount,
            trxDate: trxDate
        }
    }

    res.status(201).json(result);
}