require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const layoutexpress=require('express-ejs-layouts')
const path = require('path');
const bodyParser=require('body-parser')
const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin')
const User = require('./models/usermodel')
const multer=require('multer')
const bus= require('./models/addbusmodel');
const Admindata= require('./models/adminmodel');
const session=require('express-session')


const app=express()

app.set("view engine","ejs")
app.set("views",path.join(__dirname,'views'))
app.set('layout','layouts/layout')
app.use(bodyParser.urlencoded({ extended: false}));
app.use(layoutexpress)
app.use(express.static('public'))
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 600000000 },
    resave: false 
}));

app.use('/',userRouter)
app.use('/admin',adminRouter)

const PORT=process.env.PORT || 4000

mongoose.connect(process.env.DB_URL)
const db=mongoose.connection;
db.on('error',(error)=>console.log(error))
db.once('open',()=> console.log('connected to database'))


app.listen(PORT,()=>{
    console.log("server starting")
})
