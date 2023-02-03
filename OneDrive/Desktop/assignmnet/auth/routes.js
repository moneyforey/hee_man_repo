const { Router } = require('express');
const UserModel = require('./schema');



const app = Router();

app.post('/login',async(req,res)=>{
      
    let user = UserModel.findOne(req.body);
    const {username,email} = user;
    
    if(!user){
        res.send('wrong credentilas')
    }
    
    res.send({message:'login successfully', token:`${username}+${Math.random()}+${email}`});
      
})


app.post('/register',async(req,res)=>{
    // let {username,email,password} = req.body;
    let user = UserModel.findOne(req.body);
    
    if(user){
       return res.send('user already exist');
    }

    let newUser =  new UserModel(req.body);

    await newUser.save();

    res.send('registration successfully');

})


module.exports = app;