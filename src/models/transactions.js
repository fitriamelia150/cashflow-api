const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    trxName: {
        type: String,
        required: true
    },
    trxDate: {
        type: Date,
        required: true
    },
    trxAmount: {
        type: Number,
        required: true
    },
    trxVia: {
        type: String,
        required: true
    },
    trxType: {
        type: String,
        required: true
    },
    trxNote: {
        type: String,
        required: true
    },
    bankFrom: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Transaction', transactionSchema)