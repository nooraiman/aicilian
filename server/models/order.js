const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
    type: String,
    table: String,
    status: String,
    menus: {type: Object},
    totalPrice: Number,
    totalQuantity: Number,
    paymentType: String,
    session: String,
    timestamp: Date,
})

const order = mongoose.model('order', orderSchema)
module.exports = order