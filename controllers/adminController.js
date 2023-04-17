const bcrypt = require('bcrypt');
const Admindata = require('../models/adminmodel');
const buses = require('../models/addbusmodel');
const multer = require('../middleware/multer');


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
        


}
