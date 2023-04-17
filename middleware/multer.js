const multer = require('multer')
const fs = require('fs')
const path = require("path")

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/gif' ||
        file.mimetype == 'image/webp' ||
        file.mimetype == 'image/avif'

    ) {
        cb(null, true)
    }
    else {
        cb(null, false);
        cb(new Error('Only jpeg,  jpg , png, avif and gif Image allow'))
    }
};

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../public/images/bus-pictures"))
    },
    filename: function (req, file, cb) {
      const name= Date.now() + '-' + file.originalname;
      cb(null,name)
    }
  })
  
  const uploadbus = multer({ storage: storage1 })


  // const storage2 = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, path.join(__dirname,"../public/images/guide-pictures"))
  //   },
  //   filename: function (req, file, cb) {
  //     const name= Date.now() + '-' + file.originalname;
  //     cb(null,name)
  //   }
  // })
  
  // const uploadguide = multer({ storage: storage2 })











  module.exports= {uploadbus};