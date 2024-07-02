const express = require('express');
const app=express();
const cors = require('cors'); 
const authcontrollerModule = require('./controller/authcontroller.js');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const bodyParser = require('body-parser'); 
// Mongo db
const { DBConnection } = require("./database/db");
DBConnection();



// middle wares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  middlewares
app.use(
    cors({
      origin: ['http://localhost:5174','http://localhost:5173'],
      credentials: true, 
    })
  );
// app.use(cookieParser()); //we need to use this middleware for cookie
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req ,res)=>{
    res.send("File Sharing App");
});

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server Listening at Port ${PORT}`);
});

app.post("/login",authcontrollerModule.login_post); //login
app.post("/signup",authcontrollerModule.signup_post); //creat account
app.get("/logout",authcontrollerModule.logout_get); //logout

app.get('/share', authcontrollerModule.try);


