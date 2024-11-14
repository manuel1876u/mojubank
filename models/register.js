  

const express = ('express'); 
const mongoose = require('mongoose'); 
const bcrypt  = require('bcryptjs');

 const RegisterSchema = new mongoose.Schema({
    
    userid : {
        type: String,
        required : true, 
        unique : true,
    },

    
    regpass : {
        type: String, 
        required : true,
    },   
 
      date : {
               type : Date,
               default : Date.now(),
      },
  

 });   
 
 
 const Mem = mongoose.model('Clients', RegisterSchema);
 module.exports = Mem; 


  