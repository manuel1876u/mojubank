
 
const express = require('express');
const ejs = require('ejs');
const app = express();   

exports.getProfile = (req, res)=>{ 
      const username = req.params.username;
      res.render('./pages/dashboard', {username : username});
}    
 