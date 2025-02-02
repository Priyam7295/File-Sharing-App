const mongoose = require('mongoose');
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter your firstname"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter your lastname"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]   //to check if it is an email
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;