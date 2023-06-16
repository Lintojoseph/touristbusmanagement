const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const adminSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    
   
    email:{
        type:String,
        required:true,
        
    },
    
    
    password:{
        type: String,
        required: true,
    },
    confirmpassword:{
      type:String,
      required:true
  }
})
adminSchema.pre('save', function(next) {
    const admin = this;
    if (!admin.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(admin.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
  
        admin.password = hash;
        next();
      });
    });
  });

  module.exports=mongoose.model("admin", adminSchema);
