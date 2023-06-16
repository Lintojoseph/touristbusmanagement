const bcrypt = require('bcrypt')
const Userdata = require('../models/usermodel')
const buses = require('../models/addbusmodel');
const bookings = require('../models/booking');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// const usermodel = require('../models/usermodel');
const {isValidDate} = require('../middleware/bookingdate');
const order = require('../models/statusmodel');
const userHelpers = require('../helpers/userDatabase');
const moment = require('moment');


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.Email,
        pass: process.env.Pass
    }
})



module.exports = {
    gethome: async (req, res) => {
        await buses.find({}).then(result => {
            console.log(result)
            res.render('user/home', { result })

        })

    },
    getdestination: (req, res) => {
        res.render('user/location')
    },
    getview: async (req, res) => {
            console.log(req.params.id);
            console.log(req.session.user);
        if (req.session.user) {
            let id = req.params.id
          const result =  await buses.findById(id)
                console.log(result)
                res.render('user/view', { result })
            

        }
        else {
            res.redirect('/login')
        }

    },

    getlogin: (req, res) => {

        // if(req.session.logg)
        // {
        //     res.redirect('/bookingstatus')
        // }
        // else{
        //     res.render("user/login")
        // }

        res.render('user/login')



    },
    postlogin: async (req, res) => {
        try {
            console.log(req.body);
            let Email = req.body.email;
            let PASS = req.body.password;
            console.log(Email);
            const user = await Userdata.findOne({ email: Email });
            if (user) {
                console.log(user, "-----------------------");
                const data = await bcrypt.compare(PASS, user.password);
                console.log(data);
                if (data) {
                    req.session.user = data
                    res.redirect("/");
                }
                else {
                    req.session.userlogin = "Invalid username or password"
                    res.redirect("/login");
                }
            }
        } catch {
            res.status(500).send();
        }



        // try{
        //     console.log(req.body,"lllllllllllllllllllllllllllllllllllllllllll");
        //     const user=await Userdata.findOne({name:req.body.name})
        //     if(user){
        //         console.log(user)
        //         let data=await bcrypt.compare(req.body.password,user.password)
        //         if(data){
        //             req.session.login=data
        //             res.redirect('/bookingstatus')
        //         }
        //     }else{
        //         res.send("wrong password")
        //     }
        // }
        // catch{
        //     res.send("details")
        // }
    },
    getregister: (req, res) => {
        res.render('user/register')
    },
    postregister: async (req, res) => {
        const { name, email, password, confirmpassword } = req.body;
        if (!name || !email || !password || !confirmpassword) {
            return res.status(422).json({ error: 'plz fill the property' });
        }

        try {
            const userExist = await Userdata.findOne({ email: email });
            if (userExist) {
                return res.status(422).json({ error: 'Email already exist' })
            } else if (password != confirmpassword) {
                //return res.status(422).json({ error: 'Password is not matchnig' }) 
                res.redirect('/register')


            } else {
                var val = Math.floor(1000 + Math.random() * 9000);
                req.body.token = val
                req.session.signup = req.body
                console.log(val, "token vanuuu");

                transporter.sendMail({
                    to: email,
                    from: process.env.Email,
                    subject: 'Signup Verification',
                    html: `<h4>This your token for OTP Verfication </h4>:<h2>${val}</h2>`
                })
                res.render('user/otpsignup')

            }
            console.log(req.body);

        } catch (err) {
            console.log(err)
            res.redirect('/404error')
        }
    },

    // postregister:async (req, res) => {
    //     try {
    //         console.log(req.body)
    //         const username = req.body.firstname
    //         const lastname=req.body.lastname
    //         const address=req.body.address
    //         const email=req.body.email
    //         const phone=req.body.phone
    //         const place=req.body.place
    //         const password=req.body.password
    //         const userdetail= new Userdata({
    //             name:username,
    //             lastname:lastname,
    //             address:address,
    //             email:email,
    //             phone:phone,
    //             place:place,
    //             password:password
    //     })

    //     await userdetail.save().then(user=>{
    //         console.log(user)
    //         res.redirect('/login')

    //     })

    //     } catch (error) {
    //         console.log(error)

    //     }

    // },
    getbooking: async (req, res) => {
        try {
            const busId = req.params.id
            console.log(busId);
            const result = await buses.findOne({ _id: busId })
            console.log(result);
            res.render('user/booking', { result })
        } catch (error) {

        }

    },


    //     postbooking:async(req,res)=>{
    //      try {
    //         // console.log(req.params.id,"id vannuuuuu");
    //         const userId = req.params.id
    //         const username=req.body.name
    //         const useremail=req.body.email
    //         const userarrival=req.body.arrival
    //         const userdeparture=req.body.departure
    //         const peoples=req.body.people
    //         const userphone=req.body.phone
    //         const id = await buses.findOne({_id:userId})
    //         // console.log(id,"vanuuuuuu");
    //         console.log(req.params.id);
    //         const exist =  await bookings.find({_id:mongoose.Schema.Types.ObjectId(req.params.id)});
    //         console.log(exist,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    //         console.log(exist.length);
    //         if(exist.length == 0){
    //         // const userbooking=new bookings({
    //         //     user:userId,
    //         //     name:username,
    //         //     email:useremail,
    //         //     arrival:userarrival,
    //         //     departure:userdeparture,
    //         //     peoples:peoples,
    //         //     phone:userphone
    //         // })
    //         const a= await userbooking.save()
    //         console.log(a,"save kazhinju");
    //         const data=  await bookings.find()
    //         console.log( data);
    //          res.redirect(`/bookingstatus/${ data[0]._id}`)

    //     }
    //     else{console.log("email already exist");
    //     res.send("email vere adikkada thendi.........!!!!!!",)
    // }

    //      } catch (error) {
    //         res.send("email vere adikkada thendi.........",)
    //      }

    //     },

    postbooking: async(req, res) =>{
        try{
            
            console.log(req.params,"lin");
            const busid = req.params.id
            
            const username=req.body.name
            const useremail=req.body.email
            const userarrival=req.body.arrival
            const userdeparture=req.body.departure
            const peoples=req.body.people
            const userphone=req.body.phone
            // Validate booking dates
            if (!isValidDate(userarrival) || !isValidDate(userdeparture)) {
                res.status(400).send('Invalid booking dates');
                return
            }
            if (new Date(userarrival) < new Date()) {
                res.status(400).send('Booking date must be in the future');
                return
            }

            const userbooking=await new bookings({
                            user:busid,
                            name:username,
                            email:useremail,
                            arrival:userarrival,
                            departure:userdeparture,
                            peoples:peoples,
                            phone:userphone
                        }).save();
                        res.redirect(`/bookingstatus/${ userbooking._id}`)
                        console.log(userbooking);
            // const exist =  await bookings.find({_id: "64394543f6e130278fa3c0e4"});
           
        }catch(err){
            console.log(err);
        }
    },
    getbookingstatus: async (req, res) => {
       

        const status = req.params.id
        console.log(status, 'statusss bus id----------')
        //const userId = await bookings.find().populate('user')
        const books = await bookings.findById(status).populate('user')

        // const books = await bookings.
        console.log(books," user")
        // console.log(resu);<h3>Booking For <%=userId.json().user.busname %></h3>
        //  .then(books=>{
        res.render('user/bookingstatus', {books})
        // res.redirect(`/bookingstatus/${books}`)

        //  })

        // }else{
        // res.redirect('/booking')










    },
    
    
    getverify: (req, res) => {
        try {
            const { name, email, password, confirmPassword, token } = req.session.signup;
            if (req.query.id) {
                console.log('keri');
                var val = Math.floor(1000 + Math.random() * 9000);
                transporter.sendMail({
                    to: email,
                    from: process.env.NODEMAILER_EMAIL,
                    subject: 'Signup Verification',
                    html: `<h4>This your token for OTP Verfication </h4>:<h2>${val}</h2>`
                })
            }
            req.session.signup.token = val
            res.render('user/otpsignup')
        } catch (error) {
            console.log(error);
            res.redirect('/404error')
        }

    },
    postotpverify: async (req, res) => {
        try {
            const { name, lastname, phone, address, place, email, password, confirmpassword, token } = req.session.signup;
            // const {name, email, password, confirmPass, token }
            if (token == req.body.otp) {
                const user = new Userdata({ name, lastname, email, phone, address, place, password, confirmpassword })
                console.log(user);
                await user.save().then((doc) => {
                    req.session.logg = doc
                    res.redirect('/login');
                })
            } else {
                res.redirect('/verify')
                console.log('invalid otp');
            }
        } catch (error) {
            console.log(error);
            res.redirect('/404error')
        }

    },
    getpayment: async (req, res) => {
        try {
          const pId = req.params.id;
      
          const result = await bookings.findOne({ _id: pId });
          console.log(result, 'result');
          res.render('user/payment', { result });
        } catch (error) {
          console.log(error);
        }
      },
    postpayment:async(req,res)=>{
        try{
            const status = req.body['payment-method'] ==='COC'?'placed':'pending'
            
            const today = new Date();
            const paymentDate = today.toISOString().slice(0, 10);
            console.log(paymentDate);
            if (!paymentDate) {
             // Handle invalid date value
             console.error('Invalid date value');
            // Return an error response or redirect as per your requirement
                return res.status(400).json({ error: 'Invalid date value' });
            }
        

            const bookpay=new order({
                user_Id:req.body.userId,
                name:req.body.name,
                ph:req.body.phone,
                paymentDate:paymentDate,
                // place:req.body.place,
                paymentMethod:req.body['payment-method'],
                orderStatus:status

            })
            await bookpay.save().then(result=>{
                console.log(result,'payyyy')
                if(req.body['payment-method']==='COC'){
                    res.json({codeSucess:true})
                }else{
                    userHelpers.generateOrder(result).then((response)=>{
                        console.log(response,"diiiiiiiiiiiiiiiiiiii");
                         res.json({response})
                    })
                    

                }
                console.log(bookpay,'booking completed');
            })
        }catch (error) {
            console.log(error);
            res.redirect('/404error'); 
         }   
    },
    verifypayment:(req,res,next)=>{
        console.log(req.body);
            try{
                userHelpers.paymentVerify(req.body).then(async()=>{
                    const id1 = req.body['order[receipt]']
                    await order.findOneAndUpdate({_id:id1},{
                        $set:{orderStatus:'Booked'}
                    })  
                })    
        }catch(error){
            next(new Error(error))
            res.redirect('/404')
        }  
    },
    success:(req,res)=>{
        try{
            res.render('user/success',{user:false})
        }catch(err){
            console.log(err);
            res.redirect('/404')
        }
     }, 
     forgetpassword:(req,res)=>{
        res.render('user/forgetpassword',{user:false,login:false})
     },
     postforgetpassword:async(req,res)=>{
        try {
            const email = req.body.email
            await Userdata.findOne({email:email}).then(users=>{
                if(users){
                    res.redirect('/')
                    transporter.sendMail({
                        to:[users.email],
                        from: process.env.user,
                        subject:'Password Reset',
                        html:`<h4>To reset Your Password <a href="http://localhost:${process.env.APP_URL}/resetPassword/${users._id}">Click Here</a>`
                    })  
                }else{
                    res.redirect('/forgetpassword')
                }
            })
        } catch (error) {
            console.log(error);
             res.redirect('/404error')
        }
       
    }, 
    getresetPassword:async(req,res)=>{
        try {
            const authId = req.params.id
        console.log(authId,"authrrrrrrrrr")
        await Userdata.findOne({_id:authId}).then(auth=>{
            res.render('user/resetPassword',{auth});
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
            const user = await usermodel.findOne({_id:auth})
            await Userdata.updateOne({_id:auth},{$set:{password:hash}},{new:true}).then(result=>{
              console.log(result,"password update");
              res.redirect('/login');
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
        res.redirect('/')
    },
    getcontact:(req,res)=>{
        res.render('user/contact')
    }        
}
