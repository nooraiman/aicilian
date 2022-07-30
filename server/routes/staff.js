const express = require('express');
const route = express.Router()
const passport = require('passport');
require('../config/passport');
const connectEnsureLogin = require('connect-ensure-login');
var Staff = require('../models/staff');
var Menu = require('../models/menu');
var Order = require('../models/order');

// Upload Imges
const crypto = require('crypto');
const path = require('path')
const multer = require("multer");
uploadPath = path.resolve(__dirname, "../../client/public/assets/img");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadPath)
    },
    filename: function (req, file, callback) {
        // RandomBytes function will generate a random name
        let customFileName = crypto.randomBytes(18).toString('hex')
        // get file extension from original file name
        let fileExtension = path.extname(file.originalname).split('.')[1];
        callback(null, customFileName + '.' + fileExtension)
    }
})
const upload = multer({ storage:  storage});

// Staff
route.get('/',connectEnsureLogin.ensureLoggedIn('/staff/login'), (req,res) => {
    Staff.findOne({'_id': req.session.passport.user}, function(err, staff) {
        if(err) {
            console.log(err)
        }
        else{
            req.session.staffName=(staff.name).substring(0,10);
            req.session.staffRole=staff.role;
            res.render('staff/index', {title: "Home", expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole})
        }
    })
})

// Staff - Login
route.get('/login', (req,res) => {
    res.render('staff/login', {message: req.flash("error")})
})

route.post('/login',
    passport.authenticate('local.login', {
        failureRedirect: '/staff/login',
        successRedirect: '/staff',
        failureFlash: true
      }),
      (req, res) => {
})

// Staff Logout
route.get('/logout', (req,res) => {
    req.logout(() => {
        res.redirect('/staff/login');
    });
})

// Staff - Profile
route.get('/profile',connectEnsureLogin.ensureLoggedIn('/staff/login'), (req,res) => {
    Staff.findOne({'_id': req.session.passport.user}, function(err, staff) {
        if(err) {
            console.log(err)
        }
        else{
            req.session.staffName=(staff.name).substring(0,10);
            req.session.staffRole=staff.role;
            res.render('staff/profile', {title: "Profile", data: staff, expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole})
        }
    })
})

// Staff - Update Profile
route.post('/profile', (req,res) => {
    staffId = req.session.passport.user;

    name = req.body.name;
    email = req.body.email;
    password = req.body.password || null;

    if(password == null || password.length == 0) {
        Staff.findByIdAndUpdate((staffId), {'name': name, 'email': email}, function(err, result) {
            if(err)
            {
                req.flash('error', {message: 'Staff ID not found'});
                res.redirect('/staff/profile');
            }
            else
            {
                req.session.staffName=(name).substring(0,10);
                req.flash('success', {message: 'Profile updated successfully'});
                res.redirect('/staff/profile');
            }
        }) 
    }
    else {
        var staff = new Staff();
        password = staff.encryptPassword(password);

        Staff.findByIdAndUpdate((staffId), {'name': name, 'email': email, 'password': password}, function(err, result) {
            if(err)
            {
                req.flash('error', {message: 'Staff ID not found'});
                res.redirect('/staff/profile');
            }
            else
            {
                req.session.staffName=(name).substring(0,10);
                req.flash('success', {message: 'Profile updated successfully'});
                res.redirect('/staff/profile');
            }
        })
    }

})

// Staff - Manage Staff
route.get('/manage_staff', connectEnsureLogin.ensureLoggedIn('/staff/login'), (req,res) => {
    Staff.find({}, function(err,data) {
        res.render('staff/manage_staff/index', {data: data, title: "Manage Staff", expressFlash: req.flash('success'), expressFlash2: req.flash('error'),staffName: req.session.staffName, staffRole: req.session.staffRole})
    })
})

// Staff - Update Staff
route.get('/manage_staff/update/:id', (req,res) => {
    Staff.findOne({_id: req.params.id}, (err, result) => {
        if(err) {
            req.flash('error', {message: 'Staff not found'});
            res.redirect('/staff/manage_staff');
        }
        if(result) {
            res.render('staff/manage_staff/update', {data: result, title: "Update Staff", expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole})
        }
       
    })
})

// Staff - Update Staff
route.post('/manage_staff/update/:id', (req,res) => {
    staffId = req.params.id;
    name = req.body.name;
    email = req.body.email;
    password = req.body.password || null;
    role = req.body.role;

    if(password == null || password.length == 0) {
        Staff.findByIdAndUpdate((staffId), {'name': name, 'email': email, 'role': role}, function(err, result) {
            if(err)
            {
                req.flash('error', {message: 'Staff ID not found'});
                res.redirect('/staff/manage_staff/');
            }
            else
            {
                req.flash('success', {message: 'Staff updated successfully'});
                res.redirect('/staff/manage_staff/');
            }
        }) 
    }
    else {
        var staff = new Staff();
        password = staff.encryptPassword(password);

        Staff.findByIdAndUpdate((staffId), {'name': name, 'email': email, 'password': password, 'role': role}, function(err, result) {
            if(err)
            {
                req.flash('error', {message: 'Staff ID not found'});
                res.redirect('/staff/manage_staff/');
            }
            else
            {
                req.flash('success', {message: 'Staff updated successfully'});
                res.redirect('/staff/manage_staff/');
            }
        })
    }

})

// Staff - Delete Staff
route.get('/manage_staff/delete/:id', (req,res) => {
    Staff.findByIdAndRemove(req.params.id, function (err, result) {
        if(!err) {
            req.flash('success', {message: 'Staff removed successfully!'});
            res.redirect('/staff/manage_staff');
        } else {
            req.flash('error', {message: 'Failed to removed the staff!'});
            res.redirect('/staff/manage_staff');
        }
    })
})

// Staff - Add Staff
route.get('/manage_staff/add', (req,res) => {
    res.render('staff/manage_staff/add', {title: "Add Staff", expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole})
})

// Add Staff
route.post('/manage_staff/add', 
    [connectEnsureLogin.ensureLoggedIn('/staff/login'), passport.authenticate('local.signup', {
        successRedirect: '/staff/manage_staff',
        failureRedirect: '/staff/manage_Staff',
        failureFlash: true
      })],
      (req, res) => {
        // if(req.flash('error')=="success"){
        //     req.flash('success', {message:'Staff added successfully'})
        //     location.redirect('/staff/manage_staff')
        // }

})

// Staff - Manage Menu (Index)
route.get('/manage_menu', connectEnsureLogin.ensureLoggedIn('/staff/login') , (req,res) => {
    Menu.find({}, function(err,data) {
        res.render('staff/manage_menu/index', {data: data, title: "Manage Menu", expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole})
    })
})

// Staff - Update Menu
route.get('/manage_menu/update/:id', (req,res) => {
    Menu.findOne({'_id': req.params.id}, function(err,docs) {
        res.render('staff/manage_menu/update', {data: docs, title: "Manage Menu", expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole})
    })
})

// Staff - Update Menu
route.post('/manage_menu/update/:id', upload.array("file"), (req,res) => {

    let menu_id = req.params.id;

    // Menu Details
    menu = req.body.menuName;
    type = req.body.type;
    file = req.body.file;
    price = req.body.price;
    status = req.body.status;
    detail = req.body.detail;

    if(req.files.length<=0 || file == '') {
        Menu.findByIdAndUpdate((menu_id), {'name': menu, 'type': type, 'price': price, 'detail': detail, 'status': status}, function(err, result) {
            if(err)
            {
                req.flash('error', {message: 'Menu ID not found'});
                res.redirect('/staff/manage_menu/');
            }
            else
            {
                req.flash('success', {message: 'Menu updated successfully'});
                res.redirect('/staff/manage_menu/update/'+menu_id);
            }
        })
    }
    else {
        image ='/img/'+req.files[0].filename,
        Menu.findByIdAndUpdate((menu_id), {'name': menu, 'image': image, 'type': type, 'price': price, 'detail': detail, 'status': status}, function(err, result) {
            if(err)
            {
                req.flash('error', {message: 'Menu ID not found'});
                res.redirect('/staff/manage_menu/');
            }
            else
            {
                req.flash('success', {message: 'Menu updated successfully'});
                res.redirect('/staff/manage_menu/update/'+menu_id);
            }
        })
    }
})


// Staff - Add Menu
route.get('/manage_menu/add', (req,res) => {
    res.render('staff/manage_menu/add', {title: "Add Menu", expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole})
})

// Staff - Add Menu
route.post('/manage_menu/add', upload.array("file"), (req,res) => {
    var menu = new Menu({
        name: req.body.name,
        image: '/img/'+req.files[0].filename,
        type: req.body.type,
        status: req.body.status,
        price: req.body.price,
        detail: req.body.detail
    })

    menu.save((err, doc) => {
        if (!err) {
            req.flash('success', {message: 'Menu added successfully!'});
            res.redirect('/staff/manage_menu');
        }
        else {
            req.flash('error', {message: 'Menu has not been added!'});
            res.redirect('/staff/manage_menu');
        }
    })
})

// Staff - Delete Menu
route.get('/manage_menu/delete/:id', (req,res) => {
    Menu.findByIdAndRemove(req.params.id, function (err, result) {
        if(!err) {
            req.flash('success', {message: 'Menu removed successfully!'});
            res.redirect('/staff/manage_menu');
        } else {
            req.flash('error', {message: 'Failed to removed the menu!'});
            res.redirect('/staff/manage_menu');
        }
    })
})

// Staff - Manage Order
route.get('/manage_order', connectEnsureLogin.ensureLoggedIn('/staff/login') ,(req,res) => {
    Order.find({}, function (err, docs) {
        if(err) {

        }  

        if(docs == '') {
            
        }

        res.render('staff/manage_order/index', { title: 'Manage Order', orders: docs,  expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole});
    })
})

route.get('/manage_order/:id', (req,res) => {
    orderId = req.params.id;

    Order.findOne({_id:orderId}, function(err, docs) {
        if(err) {
            req.flash('error', {message: 'Order ID is not found'});
            res.redirect('/')
        }
        
        if(docs) {
            res.render('staff/manage_order/update', { title: 'View Order Details', table: req.session.table_num, orders: docs, expressFlash: req.flash('success'), expressFlash2: req.flash('error'), staffName: req.session.staffName, staffRole: req.session.staffRole});
        } else {
            req.flash('error', {message:'Order ID is not found'});
            res.redirect('/')
        }
     })
})

route.post('/manage_order/:id', (req,res) => {
    orderId = req.params.id;
    status = req.body.status;

    Order.findByIdAndUpdate((orderId), {'status': status}, function(err, result) {
        if(err)
        {
            req.flash('error', {message: 'Order not found'});
            res.redirect('/staff/manage_order/');
        }
        else
        {
            req.flash('success', {message: 'Order status updated successfully'});
            res.redirect('/staff/manage_order/'+orderId);
        }
    })
})

module.exports = route