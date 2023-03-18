const express=require('express')
const router=express.Router();
const {
    gethome,
    getdestination,
    getview,
    getlogin,
    postlogin,
    getregister,
    postregister
} = require('../controllers/userController')


router.get('/',gethome)
router.get('/destination',getdestination)
router.get('/view',getview)
router.get('/login',getlogin)
router.post('/login',postlogin)
router.get('/register',getregister)
router.post('/register',postregister)


module.exports=router