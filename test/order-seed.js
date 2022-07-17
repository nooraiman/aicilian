var order = require('../models/order')
const dotenv = require('dotenv')
const Table = require('../models/table')

const connectDB = require('../controllers/connection');
const { default: mongoose } = require('mongoose');
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT

connectDB()

var table = Table.find({number : '1'}).then(function(results) { return results[0]._id });
console.log(table)

// function T1(n1) {
//     Table.find({number : n1})
//     .then(function(results)) 
//     { result }
// }
// Table.find({number: '1'})
// .then(function(results) {
//     // console.log(results)
//     console.log(results[0]._id)
//     table = results[0]
//     console.log(results[0].number)
// })

console.log(table)
// console.log(tableID)

// var s = new order.Order({
//     date: Date.now(),
//     total: "104.20",

//     table: "2"
// }).save()


// for(var i=1; i < 10;i++) {
//     var table = new Order({
//         number: i,
//         size: "3"
//     }).save()
// }