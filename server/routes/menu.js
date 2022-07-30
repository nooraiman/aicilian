const express = require('express');
const route = express.Router()
const Menu = require('../models/menu')

// Main Menu
route.get('/', (req, res) => {
    Menu.find({'type':'Main-Dish'},function (err, docs) {
        var menuChunks = [];
        var chunkSize = 3;

        for(i=0; i<docs.length; i+=chunkSize) {
            menuChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('customer/menu', { title: 'Main Dish', menus: menuChunks, table: req.session.table_num, message: req.flash('message') });
    })
});

// Side Menu
route.get('/side', (req, res) => {
    Menu.find({'type':'Side-Dish'},function (err, docs) {
        var menuChunks = [];
        var chunkSize = 3;

        for(i=0; i<docs.length; i+=chunkSize) {
            menuChunks.push(docs.slice(i, i+chunkSize));
        }
        
        res.render('customer/menu', { title: 'Side Dish', menus: menuChunks, table: req.session.table_num, message: req.flash('message') });
    })
});

// Drinks Menu
route.get('/drinks', (req, res) => {
    Menu.find({'type':'Drinks'},function (err, docs) {
        var menuChunks = [];
        var chunkSize = 3;

        for(i=0; i<docs.length; i+=chunkSize) {
            menuChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('customer/menu', { title: 'Drinks', menus: menuChunks, table: req.session.table_num, message: req.flash('message') });
    })
});

// Desserts 
route.get('/desserts', (req, res) => {
    Menu.find({'type':'Desserts'},function (err, docs) {
        var menuChunks = [];
        var chunkSize = 3;

        for(i=0; i<docs.length; i+=chunkSize) {
            menuChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('customer/menu', { title: 'Desserts', menus: menuChunks, table: req.session.table_num, message: req.flash('message') });
    })
});

// Set Menu 
route.get('/set', (req, res) => {
    Menu.find({'type':'Set-Menu'},function (err, docs) {
        var menuChunks = [];
        var chunkSize = 3;

        for(i=0; i<docs.length; i+=chunkSize) {
            menuChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('customer/menu', { title: 'Set', menus: menuChunks, table: req.session.table_num, message: req.flash('message') });
    })
});

module.exports = route