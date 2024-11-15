 
const express = require('express');
const ejs = require('ejs');
const MemberSchema = require('../models/register');  
const bcrypt  = require('bcryptjs');
const saltRounds = 12;
const app = express();  
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.getLogin = (req, res)=>{
      res.render('./pages/login');
}   

exports.postMember = async (req,res)=> { 
      const password = await bcrypt.hash('67812211', saltRounds);
      const newMemb = await MemberSchema.create({
           userid : 'YunaLimWong',
           regpass : password,
      });  
      console.log(newMemb); 
}  

exports.postLogin = async (req,res)=> {
      const userid = req.body.userid;
      const pswd = req.body.regpass;    
      try{     
     const memb = await MemberSchema.findOne({ userid: userid }); 
     if(memb){
        await bcrypt.compare(pswd, memb.regpass, function(err, auser){
           
            if(err){
                  res.status(500).send('Something went wrong!');
                } 
   
                 else{ 
   
                  if(auser){  
              const token = jwt.sign({ userId : memb.userid }, process.env.JWT_SECRET_KEY, { 
                     expiresIn : '3d',
                  }); 
                  res.cookie('authToken', token, {httpOnly : true, secure : true});
                     res.status(200).json({message : 'success'});  
            }      
            
            else{
                  res.status(401).send('Invalid username or password');     
               }
      }  
          
        });
     }   
       
     else{
      res.status(404).send('User does not exist in our record');      
   }

      }    

      catch(err){
             console.log(err);
      }
}
