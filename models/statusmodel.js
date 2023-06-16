const mongoose=require('mongoose')

const statusSchema=new mongoose.Schema({
    user_Id: {
        type: String,
        ref: 'user',
        required: true
      },
    name:{
        type:String,
        required:true
    },
    ph:{
        type:Number,
        required:true
    }, 
    paymentDate: {
        type: Date,
        // default: Date.now()
      },
    // place:{
    //     type:String,
    //     required:true
    // },
    paymentMethod: String,
    orderStatus: String,
})

const status=mongoose.model('status',statusSchema)
module.exports=status