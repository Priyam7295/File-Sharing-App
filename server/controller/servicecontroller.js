const express = require("express");
const app = express();
const User = require("../models/users.js");
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const File = require("../models/file.js");
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


module.exports.upload_file = async (req, res) =>{
    const fileobj={
        path:req.file.path,
        name:req.file.originalname
    };

    console.log("jhbj",req);
    try {
        const file = await File.create(fileobj);
        res.status(200).json(`http://localhost:8000/file/${file._id}`);
        
    } catch (error) {
        res.status(500).json({"error":error.message});
    }
    // res.send("ja na lawde");
}

module.exports.getImage =async(req ,res)=>{
    try {
        const  file = await File.findById(req.params.fileId);
        file.downloadCount++;
        await file.save();

        res.download(file.path ,file.name);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}