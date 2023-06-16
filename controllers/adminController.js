const bcrypt = require('bcrypt');
const Admindata = require('../models/adminmodel');
const buses = require('../models/addbusmodel');
const multer = require('../middleware/multer');
const bookings = require('../models/booking');
const nodemailer = require('nodemailer');
const order = require('../models/statusmodel');
const mongoose = require('mongoose');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.Email,
        pass: process.env.Pass
    }
})

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

    // postaddbus: async(req,res,next)=>{
    //     try{
        
    //         // req.files.image[0].path = req.files.image[0].path.replace('public\\', "");
    //         const images = req.files.map((file) => file.path);
    //         const Bus =new buses({
    //             busname:req.body.busname,
    //             title:req.body.title,
    //             place:req.body.place,
    //             discription:req.body.discription,
    //             // image:req.files.image[0],
    //             busphoto:images,
    //             // guidephoto:req.files.image[0]
    
    //         })
    //         await Bus.save().then((result)=>{
    //         console.log(req.session.admin+"session");
    //         console.log(result+"result")
    //             res.redirect('/admin')  
    //         })
    //     }
    //     catch(error){
    //         console.log(error.message)
    //         next(error)
    //     }
    
    // },
   
    postaddbus: async(req,res,next)=>{
        try{

            const { images1, images2,images3 } = req.files;
            const images1Array = images1.map(image => image.filename);
            const images2Array = images2.map(image => image.filename);
            const images3Array = images3.map(image => image.filename);
          //  req.body.images = [req.files.image1[0], req.files.image2[0],]
            // const images = req.files.map((file) => file.path);
            const Bus =new buses({
                busname:req.body.busname,
                title:req.body.title,
                place:req.body.place,
                discription:req.body.discription,
                mainimage:images3Array,
                busphoto:images1Array,
                guidePhoto:images2Array,
                // guidephoto:req.files.image[0]
    
            })
            await Bus.save().then((result)=>{
            console.log(req.session.admin+"session");
            console.log(result+"result")
                res.redirect('/admin')  
            })
        }
        catch(error){
            console.log(error.message)
            next(error)
        }
    
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
    },
    geteditbus:async(req,res)=>{
        try{
            if(req.session.admin){
                // const adminid=req.session.admin
                // const adminedit=await buses.findOne({_id:adminid})
                const edid=req.params.id;
                console.log(edid,"v")
               await buses.findOne({_id:edid}).then((editdoc)=>{
                    res.render("admin/editbus",{editdoc})

                })
            }else{
                res.redirect("/admin/adminlogin")

                }
                

            }catch(error){
                console.log(error)
            }
        },
        posteditbus:async(req,res)=>{
            try{
                const edid1=req.params.id;
                const busname=req.body.busname;
                const place=req.body.place;
                const image=req.file.filename;

                await buses.updateOne({_id:edid1},
                    {
                        $set:{
                            busname:busname,
                            place:place,
                            image:image,
                        }
                    })
                    .then((result)=>{
                        console.log(result)
                        res.redirect('/')

                    })
            }catch(error){
                console.log(error)
                
            }
        },
        getdeletebus:async(req,res)=>{
            const deletebus=req.params.id
            const del=await buses.deleteOne({_id:deletebus})
            console.log(del,'deleted')
            res.redirect('/admin/busdetails')
        },
        getbookstatus:async(req,res)=>{
            try{
                // console.log('hiii')
                // bookid=req.params.id
                // console.log(bookid)
                // await bookings.findById(bookid,{$set:{status:"accepted"}},{new:true})
                // res.json({ message: "Booking status updated successfully" });
                const allBook=await bookings.find()
                
                res.render('admin/bookstatus',{allBook})
            }
            
         catch (error) {
            console.log(error);
            res.status(500).send("An error occurred");
          }
        },
        deletebook:async(req,res)=>{
            try{
                let bookId=req.params.id
                await bookings.deleteOne({_id:bookId}).then(result=>{
                    console.log(result,'result')
                    res.redirect('/admin/bookstatus')
                })
            }
            catch(error){
                res.redirect('/404')
            }
        },
        getacceptbook:async(req,res)=>{
            try{
                let bookId=req.params.id
                const resp=await bookings.findOneAndUpdate({_id:bookId},{$set:{status:true}},{new:true})
                console.log(resp,'hiiii')
                res.redirect('/admin/bookstatus')

              await  transporter.sendMail({
                    to:resp.email,
                    from:process.env.Email,
                    subject:'Pay to place Book bus',
                    html:`<h3>To book your Bus Completely  <a href=http://localhost:${process.env.APP_URL}/payment/${resp._id}>Click here</a>  to Pay and get Bus</h3>`
                })
                   
            }catch(error){
                console.log(error)
                res.redirect('/404')
            }
        },
        getbookedlist:async(req,res)=>{
            try{
                
                const list=await order.find()
                res.render('admin/paymentstatus',{list})
            }catch(error){
                res.redirect('/404')
            }

        },
        logout:async(req,res)=>{
            req.session.admin=false
            res.redirect('/admin')
        },
        adminforgetpassword:(req,res)=>{
            res.render('admin/adminforgetpassword')
         },
         postadminforgetpassword: async (req, res) => {
            try {
              const email = req.body.email;
              console.log('Email:', email);

              const admins = await Admindata.findOne({ email: email });
              console.log(admins, 'llll');
          
              if (admins) {
                await transporter.sendMail({
                  to: admins.email,
                  from: process.env.user,
                  subject: 'Password Reset',
                  html: `<h4>To reset Your Password <a href="http://localhost:${process.env.APP_URL}/admin/adminresetpassword/${admins._id}">Click Here</a>`
                });
          
                res.redirect('/admin/adminlogin');
              } else {
                res.redirect('/admin/adminforgetpassword');
              }
            } catch (error) {
              console.log(error);
              res.redirect('/404error');
            }
          },
          
          
        getadminresetpassword:async(req,res)=>{
            try {
                const authId = req.params.id
            console.log(authId,"authrrrrrrrrr")
            await Admindata.findOne({_id:authId}).then(auth=>{
                res.render('admin/adminresetpassword',{auth});
            })
            } catch (error) {
                console.log(error);
                res.redirect('/404error')
            }
            
            
        }, 
        postresetpassword:async(req,res)=>{
            try {
                const auth = req.body.userid
                const pass =req.body.password
                const hash  = await bcrypt.hash(pass,10)
                const user = await Admindata.findOne({_id:auth})
                await Admindata.updateOne({_id:auth},{$set:{password:hash}},{new:true}).then(result=>{
                  console.log(result,"password update");
                  res.redirect('/admin/adminlogin');
                  transporter.sendMail({
                    to:[user.email],
                    from:process.env.user,
                    subject:'Status Of reset Password',
                    html:`<h2>Your Password Is Successfully Updated</h2>`   
                  })
                })
            } catch (error) {
                console.log(error);
                res.redirect('/404error');
            }
           
        },  
        logout:async(req,res)=>{
            req.session.user=null
            res.redirect('/admin')
        }             
    
}
