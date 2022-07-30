const passport = require('passport');
const Staff = require('../models/staff');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(staff, done) {
    done(null, staff._id)
});

passport.deserializeUser(function(staff, done) {
    Staff.findById(staff, function(err, staff) {
        done(err, staff);
    })
})

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,  
}, function(req, email, password, done) {

    Staff.findOne({'email': email}, function(err, staff) {
        if(err) {
            console.log(err)
            return done(err);
        }
        if(staff) {
            return done(null, false,  req.flash('error', { message: 'Staff already exists' }));
        }
        var newStaff = new Staff();
        newStaff.name = req.body.name;
        newStaff.email = email;
        newStaff.password = newStaff.encryptPassword(password);
        newStaff.role = req.body.role;
        newStaff.save(function(err, result){
            if (err) {
                return done(err);
            }

            return done(null, false, req.flash('success', { message: 'Staff successfully added' }));
        })
    })

    }
))

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,  
}, function(err, email, password, done){
    Staff.findOne({'email': email}, function(err, staff) {
        if(err) {
            return done(err);
        }
        if(!staff) {
            return done(null, false, { message: 'Staff is not found' }); 
        }
        if(!staff.validPassword(password)) {
            return done(null, false, { message: 'Wrong Password!' }); 
        }
        return done(null, staff);
    })
}))