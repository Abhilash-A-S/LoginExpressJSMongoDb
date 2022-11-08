const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport/passport.config');
const mongoService = require('../mongodb/mongo.service');
passportConfig(passport,
    email => mongoService
        .getObjects({ email: email }),
    id => mongoService
        .getObjects({ _id: id })
);
router.get('/', (req, res) => {
    res.render("pages/login");
});
router.get('/login', (req, res) => {
    res.render('pages/login');
});
router.get('/loginFailure', (req, res) => {
    res.send({ failureMessage: req.flash()?.errorMessage?.[0], loginFailure: true });
});
router.get('/home', async (req, res) => {
    if (req.isAuthenticated()) {
        res.render('pages/homepage');
    } else {
        res.redirect('login');
    }
});
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('login');
    });
});
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/loginFailure',
        successRedirect: '/home',
        failureFlash: true
    })
);
router.get('/register', (req, res) => {
    res.render('pages/register');
});


module.exports = router;
