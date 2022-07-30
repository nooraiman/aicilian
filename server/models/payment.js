const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    type: String,
    status: String,
    amount: Number,
    order: { type: Schema.Types.Objectid, ref: 'order' },
},
{ 
    timestamp: true 
})

const payment = mongoose.model('payment', paymentSchema)
module.exports = payment