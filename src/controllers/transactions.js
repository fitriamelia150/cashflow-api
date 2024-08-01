const {validationResult} = require('express-validator');

exports.createTransaction = (req, res, next) => {

    const { userId, trxDate, bankFrom, trxType, trxName, trxVia, trxAmount, trxNote, trxColor } = req.body;

    const errors = validationResult(req);

    console.log(errors);

    if(!errors.isEmpty()){
        const err = new Error('Input Validation Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
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