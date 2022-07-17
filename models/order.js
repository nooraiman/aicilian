const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Order Schema
const orderSchema = new mongoose.Schema({
    date: { type: Date, value: Date.now() },
    total: Number,
    table: { type: Schema.Types.ObjectId, ref: 'table'}
})

// Order Detail Schema
const orderDetailSchema = new mongoose.Schema({
    quantity: Number,
    order: { type: Schema.Types.ObjectId, ref: 'order'},
    menu: { type: Schema.Types.ObjectId, ref: 'menu'},
    status: { type: Schema.Types.ObjectId, ref: 'order_status'},
    type: { type: Schema.Types.ObjectId, ref: 'order_type'}
})

// Order Status
const orderStatusSchema = new mongoose.Schema({
    name: String
})

// Order Type
const orderTypeSchema = new mongoose.Schema({
    name: String
})


// Create Model Objects
const Order = mongoose.model('order', orderSchema)
const OrderDetail = mongoose.model('order_detail', orderDetailSchema)
const OrderStatus = mongoose.model('order_status', orderStatusSchema)
const OrderType = mongoose.model('order_type', orderTypeSchema)

// Export Model Objects
module.exports = { Order, OrderDetail, OrderStatus, OrderType }
