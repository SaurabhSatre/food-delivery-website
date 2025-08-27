const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email :{
        type : String,
        required: true
    },
    password :{
        type : String,
        required: [true, "Please , Enter the password!!"]
    },
    date :{
        type : String,
        default : new Date().toDateString()
    },
    isAdmin : {
        type : Boolean,
        default:false
    }
});

module.exports = mongoose.model("users" , UserSchema);