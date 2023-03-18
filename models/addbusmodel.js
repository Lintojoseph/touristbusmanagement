const mongoose=require('mongoose')

const addbusSchema= new mongoose.Schema({
    busname:{
        type: String,
        
    },
    
   
    place:{
        type:String,
        
    },
    
    
    image:{
        type: String,
        
    },

})

const bus=mongoose.model("bus", addbusSchema);
module.exports=bus;