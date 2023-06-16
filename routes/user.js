const express=require('express')
const router=express.Router();
const {
    gethome,
    getdestination,
    getview,
    getlogin,
    postlogin,
    getregister,
    postregister,
    postbooking,
    getbookingstatus,
    getverify,
    getbooking,
    postotpverify,
    getpayment,
    postpayment,
    verifypayment,
    success,
    forgetpassword,
    postforgetpassword,
    getresetPassword,
    postresetpassword,
    logout,
    getcontact
    // error
} = require('../controllers/userController')


router.get('/',gethome)
router.get('/destination',getdestination)
router.get('/view/:id',getview)
router.get('/login',getlogin)
router.post('/login',postlogin)
router.get('/register',getregister)
router.post('/register',postregister)
router.get('/booking/:id',getbooking)
router.post('/booking/:id',postbooking)
router.get('/bookingstatus/:id',getbookingstatus)
router.get('/verify',getverify)
router.post('/otpverify',postotpverify)
router.get('/payment/:id',getpayment)
router.put('/payment',postpayment)
router.put('/verify-payment',verifypayment)
router.get('/success',success)
router.get('/forgetpassword',forgetpassword)
router.post('/forgetpassword',postforgetpassword)
router.get('/resetPassword/:id',getresetPassword)
router.post('/resetPassword',postresetpassword)
router.get('/logout',logout)
router.get('/contact',getcontact)
// router.get('/404error',error)

module.exports=router