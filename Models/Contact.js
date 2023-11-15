const mongoose = require('mongoose')
const ContactSchema = mongoose.Schema({
                         Name:{
                             type:String,
                             required:true
                         },
                         Email:{
                             type:String,
                             required:true
                         },
                         MobileNo:{
                            type:String,
                            required:true
                         }
},{timestamps:true});

module.exports =mongoose.model("Contact",ContactSchema,"Contact")