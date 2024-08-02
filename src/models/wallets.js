const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema({
    walletName: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Wallet', walletSchema)