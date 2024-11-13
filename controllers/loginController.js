 
const express = require('express');
const ejs = require('ejs');
const app = express();

exports.getLogin = (req, res)=>{
      res.render('./pages/login');
}