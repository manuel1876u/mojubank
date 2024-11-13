 
 const express = require('express');
 const ejs = require('ejs');  
 const cors = require('cors');
 const path = require('path');
 const mongodb = require('mongodb');
 const mongoose = require('mongoose'); 
 const loginRoute = require('./routes/loginRoute'); 
 const dashboardRoute = require('./routes/dashboardRoute');

 const app = express(); 

 const dotenv = require('dotenv');  
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.set('view engine', 'ejs');
 app.use(cors());
 dotenv.config();  

 mongoose.connect(process.env.MONGOOSE_URL).then(()=>{console.log('database connected succesfully')}).catch((err)=>{
     console.log('new error: ', err); 
 });

 app.use('/', loginRoute); 
 app.use('/member', dashboardRoute); 

 app.use(express.static(path.join(__dirname + '/public'))); 
 app.listen(3000, ()=>{
     console.log('Server listening on port 3000');
 });

