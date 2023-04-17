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
    postotpverify
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

module.exports=router