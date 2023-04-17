const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    place:{
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

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
  
        user.password = hash;
        next();
      });
    });
  });


module.exports=mongoose.model("user", userSchema);

    