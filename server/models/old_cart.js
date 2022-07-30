const mongoose = require('mongoose')
const Menu = require('./menu')
const Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
    type: String, //Dine In or Take Away
    table: String,
    menus: [{ 
        menuId: {
            type: Schema.Types.ObjectId, 
            ref: 'menu'
        },
        quantity: Number,
        price: Number,
    }],
    totalPrice: Number,
    session: String
},
{ 
    timestamp: true 
})


const cart = mongoose.model('cart', cartSchema)
module.exports = cart

