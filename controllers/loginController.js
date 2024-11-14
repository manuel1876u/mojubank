 
const express = require('express');
const ejs = require('ejs');
const MemberSchema = require('../models/register');  
const bcrypt  = require('bcryptjs');
const saltRounds = 12;
const app = express();

exports.getLogin = (req, res)=>{
      res.render('./pages/login');
}   

exports.postMember = async (req,res)=> { 
      const password = await bcrypt.hash('wentino', saltRounds);
      const newMemb = await MemberSchema.create({
           userid : 'victor',
           regpass : password,
      });  
      console.log(newMemb); 
}