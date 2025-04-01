const multer=require("multer");
const storage = multer.memoryStorage()
const path=require("path");
function fileFilter (req, file, cb) { //ensuring which type of file being uploaded
    const extname=[".png",".jpeg",".jpg",".webp"];//the extention that accept
    let extention=path.extname(file.originalname);
    let includesornot=extname.includes(extention);//return true or false
    console.log(file);
    if(includesornot){
        cb(null, includesornot);// The function should call `cb` with a boolean to indicate if the file should be accepted. To reject this file pass `false`,To accept the file pass `true'
    }else{
        cb(new Error('these files are not allowed',false));
    }
}
const upload = multer({ storage: storage ,fileFilter:fileFilter, limits:{fileSize:10*1024*1024} })//ensuring accepted file size 
//The memory storage engine stores the files in memory as Buffer objects. in ram
module.exports=upload;