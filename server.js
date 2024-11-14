 
 const express = require('express');
 const ejs = require('ejs');  
 const cors = require('cors');
 const path = require('path');
 const mongodb = require('mongodb');
 const mongoose = require('mongoose'); 
 const cookieParser = require('cookie-parser');
 const bcrypt  = require('bcryptjs');
 const jwt = require('jsonwebtoken'); 
 const authMiddleware = require('./middlewares/authentication');  
 const authbMiddleware = require('./middlewares/authc'); 
 const loginRoute = require('./routes/loginRoute');  
 const dashboardRoute = require('./routes/dashboardRoute');   

  const MemberSchema = require('./models/register');

 const app = express(); 

 const dotenv = require('dotenv');  
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));   
 app.use(cookieParser());  
 
  
 app.set('view engine', 'ejs');
 app.use(cors());
 dotenv.config(); 

  
 app.use('/member/IB/profile', authMiddleware);
 app.use('/IB/Welcome', authbMiddleware);

 mongoose.connect(process.env.MONGOOSE_URL).then(()=>{console.log('database connected succesfully')}).catch((err)=>{
     console.log('new error: ', err); 
 });

 app.use('/', loginRoute); 
 app.use('/member', dashboardRoute);    
 
   
//log out user
app.get('/logout', (req, res)=>{ 
    res.clearCookie('authToken'); 
    res.redirect('/IB/Welcome');
 });
 

 app.use(express.static(path.join(__dirname + '/public'))); 
 app.listen(3000, ()=>{
     console.log('Server listening on port 3000');
 });

