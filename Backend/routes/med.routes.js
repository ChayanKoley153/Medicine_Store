const express = require('express');
const medRouter = express.Router();
var medController = require("../controller/med.controller");

const multer = require('multer');

const uploadStorage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Math.floor(Math.random()*9999)+"-"+file.originalname);
    },
    destination:'./public/uploads/'
});
const singleUpload = multer({
    storage: uploadStorage
 });
console.log("multer is configured and working");



medRouter.get("/all", medController.allMedInfo);
medRouter.post("/add",singleUpload.single('medicine_image'), medController.addingMedInfo);


module.exports=medRouter;
console.log("med router is working");

