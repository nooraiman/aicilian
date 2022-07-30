const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
},
{ 
    timestamp: true 
})

staffSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

staffSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

const staff = mongoose.model('staff', staffSchema)
module.exports = staff