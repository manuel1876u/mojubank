
const express = require('express');
const ejs = require('ejs');
const app = express(); 
const router = express.Router();   
const dashboardController = require('../controllers/dashboardController')

 router.get('/member/:username/IB/profile', dashboardController.getProfile); 
  
 module.exports = router;