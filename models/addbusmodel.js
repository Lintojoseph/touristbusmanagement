const mongoose=require('mongoose')

const addbusSchema= new mongoose.Schema({
    busname:{
        type: String,
        required:true
    },
    title:{
        type:String,
        required:true

    },
    
   
    place:{
        type:String,
        required:true
        
    },
    discription:{
        type:String,
        required:true
    },
    busphoto:{
        type:[String] },
    mainimage:{
        type:[String],
    
    }
    ,guidePhoto:{
        type:[String]
    }

})

const bus=mongoose.model("bus", addbusSchema);
module.exports=bus;