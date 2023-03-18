const bcrypt = require('bcrypt');
const Admindata = require('../models/adminmodel');
const buses = require('../models/addbusmodel');


module.exports={
    getadminpanel:(req,res)=>{
        if(req.session.admin){
        res.render('admin/adminpanel')
    }else{
        res.redirect('/admin/adminlogin')
    }
    },
    getadminlogin:(req,res)=>{
       res.render('admin/adminlogin')
    },
    postadminlogin:async (req,res)=>{
        try {
            console.log(req.body);
            let Email = req.body.email;
            let PASS = req.body.password;
            console.log(Email);
            const admin = await Admindata.findOne({ email: Email });
            if (admin) {
              console.log(admin, "-----------------------");
              const data = await bcrypt.compare(PASS,admin.password);
              console.log(data);
              if (data) {
                 req.session.admin=data
                res.redirect("/admin");
              }
              else {
                 req.session.adminlogin=null
                res.redirect("/admin/adminlogin");
              }
            }
          } catch {
            res.status(500).send();
          }
        
       
        
    },
    getadminregister:(req,res)=>{
        res.render('admin/adminregister')
    },
    postadminregister:async (req,res)=>{
        try{
            const adminname=req.body.name
            const email=req.body.email
            const password=req.body.password
            const admindetail= new Admindata({
                name:adminname,
                email:email,
                password:password
            })
            await admindetail.save().then(admin=>{
                console.log(admin)
                res.redirect('/admin/adminlogin')
            })
        }catch(error){
            console.log(error)
        }
        
    },

    getaddbus:(req,res)=>{
        res.render("admin/addbus")
    },
    postaddbus:async(req,res)=>{
        const Bus =new buses({
            busname:req.body.busname,
            place:req.body.place,
            image:req.file.filename,
        })
     await Bus.save().then((result)=>{
        console.log(req.session.admin);
        console.log(result)
            res.redirect('/admin')  
        })
    },
    getbusdetails:async(req,res)=>{
        if(req.session.admin){
        // const admin=req.session.admin
        // console.log(admin,"jjjjjjjjj");
        // const results =  await buses.findOne({_id:admin})
        // console.log(results);
         const result = await buses.find()
        res.render('admin/busdetails',{result})
        }else{
            res.redirect('/admin')
        }
    }
}
