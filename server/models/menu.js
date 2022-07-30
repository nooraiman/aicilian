const mongoose = require('mongoose')

const menuScheme = new mongoose.Schema({
    name: String,
    image: String,
    type: String,
    status: String,
    price: Number,
    detail: String
})

const menu = mongoose.model('menu', menuScheme)

module.exports = menu