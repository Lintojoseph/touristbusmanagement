const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    user:{
        type:String,
        ref:'bus',
        // required:true

    },
      
    name:{
        type:String,
        //required:true
    },
    email:{
        type:String,
        // required:true
    },
    arrival:{
        type:String,
        // required:true

    },
    departure:{
        type:String,
        // required:true
    },
    peoples:{
        type:String,
        // required:true
    },
    phone:{
        type:String,
        // required:true
    },
    status:{
        type:Boolean,
        default:false
    }






})

const booking=mongoose.model('booking',bookingSchema)
module.exports=booking