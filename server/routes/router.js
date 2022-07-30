const express = require('express');
const route = express.Router()
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

// Load Routes
const staffRoutes = require('./staff')
const menuRoutes = require('./menu')
const cartRoutes = require('./cart');

const Menu = require('../models/menu')
const Order = require('../models/order')
const Cart = require('../models/cart')

// Home
route.get('/', (req, res) => {
    Menu.find(function (err, docs) {
        var menuChunks = [];
        var chunkSize = 3;

        for(i=0; i<docs.length; i+=chunkSize) {
            menuChunks.push(docs.slice(i, i+chunkSize));
        }

        res.render('customer/index', { title: 'Home', menus: menuChunks, table: req.session.table_num, message: req.flash('message') });
    })
});

// Assign Table Number
route.get('/start/:table', (req,res) => {
    req.session.table_num = req.params.table;
    res.redirect('/')
})

route.use('/menu', menuRoutes)
route.use('/cart', cartRoutes)
route.use('/staff',staffRoutes)


route.get('/order', (req,res) => {
    Order.find({session: req.session.id}, function (err, docs) {
        if(err) {
            console.log(err);
        }  

        if(docs == '') {
            req.flash('message','You dont have any order')
            return res.redirect('/');
        }


        res.render('customer/order', { title: 'Order', table: req.session.table_num, orders: docs,  message: req.flash('message')});
    })
})

route.get('/order/:id', (req,res) => {
    orderId = req.params.id;

    Order.findOne({_id:orderId}, function(err, docs) {
        if(err) {
            req.flash('message','Order ID is not found');
            res.redirect('/')
        }
        
        if(docs) {
            res.render('customer/order_details', { title: 'View Order Details', table: req.session.table_num, orders: docs, message: req.flash('message')});
        } else {
            req.flash('message','Order ID is not found');
            res.redirect('/')
        }
     })
})
// // API
// route.post('/api/users', controller.create);
// route.get('/api/users', controller.find);
// route.put('/api/users/:id', controller.update);
// route.delete('/api/users/:id', controller.delete);


module.exports = route