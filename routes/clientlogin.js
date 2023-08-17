const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login/script');
const passport = require('../auth/passport');

router.get('/', loginController.getLogin);
router.post('/',
    passport.authenticate('local', { successRedirect: '/dashboard',
    failureRedirect: '/login' })),
    // function (req, res) {
    //     console.log("lohhged")
    //     return res.send("ok")
    //     // res.redirect('/dashboard');
    // }));

module.exports = router;