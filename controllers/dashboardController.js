
 
const express = require('express');
const ejs = require('ejs');
const app = express();   

exports.getProfile = (req, res)=>{
      res.render('./pages/dashboard');
}    
 