const mongoose = require('mongoose');

const Table = new mongoose.Schema({
    number : { type: Number, unique: true},
    size : Number
})

// Create and Export Model Objects
module.exports = mongoose.model('table', Table)