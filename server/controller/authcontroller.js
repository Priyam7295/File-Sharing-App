const express = require("express");
const app = express();
const User = require("../models/users.js");
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.try = (req, res) => {
    res.send("File share");
}

const maxAge = 5 * 60 * 60; //takes in sec
const createToken = function (id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge }) //payload , secret key , 
}

// ----------LOGIN------------
module.exports.login_post = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let errors = { email: '', password: '' };
    try {
        const user = await User.findOne({ email: email });

        if (!user) {

            errors.email = 'Email is not registered';
            return res.status(404).json({ errors });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Here you can create and return JWT or any other authentication logic
            errors.password = 'Enter correct password';
            return res.status(400).json({ errors });
        }

        const token = createToken(user._id, user.role);

        // place token inside cookie and send to client as response
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000}); 

        res.status(201).json({ user: user._id });
    }



    catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }

}

const handleSignError = (err) => {
    console.log(err.message, err.code);
    let errors = { firstname: '', lastname: '', email: '', password: '' };
    if(err.code==11000){
        errors.email ="The email is already registered.";
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;

        });
    }

    return errors;
}

// -------------CREATING AN ACCOUNT------------
module.exports.signup_post = async (req, res) => {
    const {firstname, lastname ,email  } = req.body;
    var  password = req.body.password;
    let errors={firstname:'' ,lastname:'' ,email:'',password:''};
    
    if(!password){
        errors.password="Choose a password!";
        return res.status(400).json({errors});
    }
    if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
        return res.status(400).json({ errors });
    }
    let hashedPassword = await bcrypt.hash(password ,10);
    try {
        password = hashedPassword;
        const user = await User.create({firstname , lastname , email , password});
        const token = createToken(user._id,firstname);
        
        // place token iside cookie and send to client as response
        res.cookie("jwt" , token ,{httpOnly:true , maxAge: maxAge*1000 });
        res.status(201).json({user:user._id ,firstname:firstname});
        
    } catch (error) {
        const errors = handleSignError(error);
        res.send(errors);
    }
}
module.exports.logout_get = async (req, res) => {
    const jwt = req.cookies.jwt;
    if(jwt){

      
        res.clearCookie('jwt', { httpOnly: true});
        res.status(200).json({ message: 'Logged out successfully' });
        return ;
    }

    res.status(404).send("Already logged out");

}