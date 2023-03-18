const bcrypt=require('bcrypt')
const Userdata = require('../models/usermodel')
const  buses = require('../models/addbusmodel');

module.exports ={
    gethome:async(req,res)=>{
        await buses.find().then(result=>{
            console.log(result)
            res.render('user/home',{result})

        })
        
    },
    getdestination:(req,res)=>{
        res.render('user/location')
    },
    getview:(req,res)=>{
        res.render('user/view')
    },
    getlogin:(req,res)=>{
        res.render('user/login')
    },
    postlogin:async(req,res)=>{

        try{
            const user=await Userdata.findOne({name:req.body.name})
            if(user){
                console.log(user)
                let data=await bcrypt.compare(req.body.password,user.password)
                if(data){
                    res.render('user/view')
                }
            }else{
                res.send("wrong password")
            }
        }
        catch{
            res.send("details")
        }
    },
    getregister:(req,res)=>{
        res.render('user/register')
    },
    
    postregister:async (req, res) => {
        try {
            console.log(req.body)
            const username = req.body.firstname
            const lastname=req.body.lastname
            const address=req.body.address
            const email=req.body.email
            const phone=req.body.phone
            const place=req.body.place
            const password=req.body.password
            const userdetail= new Userdata({
                name:username,
                lastname:lastname,
                address:address,
                email:email,
                phone:phone,
                place:place,
                password:password
        })
        
        await userdetail.save().then(user=>{
            console.log(user)
            res.redirect('/login')
            
        })
            
        } catch (error) {
            console.log(error)
            
        }
      
    }
}