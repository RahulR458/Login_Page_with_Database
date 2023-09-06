const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:String,
    status:String,
    role:{
        type:Number,
        default:0
    }
})

const Userdb = mongoose.model('userdb',schema);

module.exports=Userdb;