const express=require('express')
const multer=require('../middleware/multer');
const router=express.Router();
const { 
    getadminlogin,
    postadminlogin,
    getadminregister,
    postadminregister,
    getadminpanel,
    getaddbus,
    postaddbus,
    getbusdetails,


}=require('../controllers/adminController');

router.get('/',getadminpanel)
router.get('/adminlogin',getadminlogin)
router.post('/adminlogin',postadminlogin)
router.get('/adminregister',getadminregister)
router.post('/adminregister',postadminregister)
router.get('/addbus',getaddbus)
router.post('/addbus',multer.single('image'),postaddbus)
router.get('/busdetails',getbusdetails)





module.exports=router