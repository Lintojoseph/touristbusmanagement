const multer=require('multer')
const fs=require('fs')
const path=require("path")

var storage=multer.diskStorage({
    destination:function(req,file,callback){
        const uploadpath='./public/images/uploads';
        if(!fs.existsSync(uploadpath)){
            fs.mkdirSync(uploadpath)
        }
        callback(null,uploadpath)
    },
    filename: function(req,file,callback)
    {
        callback(null,file.originalname)
    }
})
var multiupload=multer({storage:storage})
module.exports=multiupload
