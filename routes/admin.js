const express=require('express')
// const upload = require('../middleware/multer');
const router=express.Router();
const multer = require('multer');
const{uploadbus,uploadguide} = require('../middleware/multer')

const { 
    getadminlogin,
    postadminlogin,
    getadminregister,
    postadminregister,
    getadminpanel,
    getaddbus,
    postaddbus,
    getbusdetails,
    geteditbus,
    posteditbus,
    getdeletebus,
    


}=require('../controllers/adminController');

router.get('/',getadminpanel)
router.get('/adminlogin',getadminlogin)
router.post('/adminlogin',postadminlogin)
router.get('/adminregister',getadminregister)
router.post('/adminregister',postadminregister)
router.get('/addbus',getaddbus)
router.post('/addbus',uploadbus.fields([{ name:'images1'}, { name:'images2'},{name:'images3'}]),postaddbus)   
router.get('/busdetails',getbusdetails)
router.get('/editbus/:id',geteditbus)
router.post('/editbus/:id',uploadbus.single('image'),posteditbus)
router.get('/deletebus/:id',getdeletebus)





module.exports=router