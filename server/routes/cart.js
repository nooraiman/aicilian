const { json } = require('express');
const express = require('express');
const route = express.Router()
const Cart = require('../models/cart');
const Menu = require('../models/menu');
const Order = require('../models/order');
const { ObjectId } = require('mongodb');
const { resolve } = require('path');

// Home
route.get('/', (req, res) => {
    if (!req.session.cart) {
        return res.render('customer/cart', { title: 'Cart', table: req.session.table_num, session: req.session.id, cart: null, totalPrice: "0.00", message: req.flash('message')});
    }
    var cart = new Cart(req.session.cart)
    res.render('customer/cart', { 
        title: 'Cart', table: req.session.table_num, session: req.session.id, cart: cart.generateArray(), 
        totalPrice: cart.totalPrice, message: req.flash('message') });

});

route.post('/add/:id', (req, res) => {
    var menuId = req.params.id;
    var tmpQty = req.body.quantity;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Menu.findById(menuId, function (err, menu) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(menu, menu.id, tmpQty);
        req.session.cart = cart;
        res.redirect('/');
    })
});

route.get('/remove/:id', (req, res) => {
    var menuId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(menuId);
    req.session.cart = cart;
    res.redirect('/cart');
});

route.post('/checkout', (req, res) => {
    if (!req.session.cart || req.session.cart.totalPrice == "0" ) {
        req.flash('message', 'You dont have any item in your cart!');
        res.redirect('/cart');
    }
    else {
        var cart = new Cart(req.session.cart);
        form = req.body
        var order = new Order({
            type: form.type,
            table: form.table,
            status: 'Placed',
            menus: cart.menus,
            totalPrice: cart.totalPrice,
            totalQuantity: cart.totalQty,
            paymentType: form.payment,
            session: req.session.id,
            timestamp: new Date().toLocaleString('en-US', {timeZone: 'Asia/Kuala_Lumpur'})
        })

        order.save(function(err, result) {
            if(err) {
                req.flash('message', 'Unable to Place Order!');
                res.redirect('/');
            }
            
            req.session.cart = null;
            req.flash('message','Order Has Been Placed!');
            res.redirect('/order');
        })
    }
});

module.exports = route