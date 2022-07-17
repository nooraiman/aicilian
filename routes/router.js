const express = require('express');
const route = express.Router()

// Home
route.get('/', (req, res) => {
    res.render('index')
});

// Login
route.get('/login', (req, res) => {
    res.render('login')
})

// Login POST
route.post('/login', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// Staff
route.get('/staff', (req,res) => {
    res.render('staff/index', {title: "Home"})
})

// Staff - Manage Menu
route.get('/staff/manage/menu', (req,res) => {
    res.render('staff/manage_menu', {title: "Manage Menu"})
})

// Staff - Manage Staff
route.get('/staff/manage/staff', (req,res) => {
    res.render('staff/manage_staff', {title: "Manage Staff"})
})

// Staff - Manage Order
route.get('/staff/manage/order', (req,res) => {
    res.render('staff/manage_order', {title: "Manage Order"})
})

// Forgot Password
route.get('/forgot', (req, res) => {
    res.render('forgot')
})

// // API
// route.post('/api/users', controller.create);
// route.get('/api/users', controller.find);
// route.put('/api/users/:id', controller.update);
// route.delete('/api/users/:id', controller.delete);


module.exports = route