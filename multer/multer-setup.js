const multer=require("multer");
const path=require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+ path.extname(file.originalname));
    }
})
/*
destination is used to determine within which folder the uploaded files should be stored.
filename is used to determine what the file should be named inside the folder
If no filename is given, each file will be given a random name that doesn't include any file extension.
Disk Storage: Files are stored on disk at a specified location
in multer diskstorage setup , you need to provide destination to specify the folder where files should be stored and filename to define the name of the uploaded files
*/
const upload = multer({ storage: storage });
module.exports=upload;