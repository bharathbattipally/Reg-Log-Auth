const mongoose = require('mongoose');

const User=mongoose.Schema({
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
        type: String,
        required:true
    },
    quote:{
        type:String,

    }

}, {collection: 'user-data'}
)


const model= mongoose.model('User',User);  // model, schema in brackets

module.exports=model;