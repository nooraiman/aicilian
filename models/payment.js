const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Payment Schema
const PaymentSchema = new mongoose.Schema({
    date: { type: Date, value: Date.now() },
    amount: { type: Number },
    order: { type: Schema.Types.ObjectId, ref: 'order'}
})

// Payment Detail Schema
const PaymentDetailSchema = new mongoose.Schema({
    payment: { type: Schema.Types.ObjectId, ref: 'payment'},
    status: { type: Schema.Types.ObjectId, ref: 'payment_status'},
    type: { type: Schema.Types.ObjectId, ref: 'payment_type'}
})

// Payment Status
const PaymentStatusSchema = new mongoose.Schema({
    name: String
})

// Payment Type
const PaymentTypeSchema = new mongoose.Schema({
    name: String
})


// Create Model Objects
const Payment = mongoose.model('payment', PaymentSchema)
const PaymentDetail = mongoose.model('payment_detail', PaymentDetailSchema)
const PaymentStatus = mongoose.model('payment_status', PaymentStatusSchema)
const PaymentType = mongoose.model('payment_type', PaymentTypeSchema)

// Export Model Objects
module.exports = { Payment, PaymentDetail, PaymentStatus, PaymentType }
