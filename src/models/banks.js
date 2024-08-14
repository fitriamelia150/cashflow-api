const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bankSchema = new Schema({
    user: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    bankName: {
        type: String,
        required: true
    },
    bankBalance: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Bank', bankSchema)