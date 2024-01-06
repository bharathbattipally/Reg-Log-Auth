const express= require('express');
const app= express();
const cors=require('cors');
const mongoose=require('mongoose');
const User= require('./models/usermodels');
const jwt=require('jsonwebtoken');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://bharathbattipally:Firstcluster@cluster0.taqxpwp.mongodb.net/?retryWrites=true&w=majority')

app.get('/hello', (req,res)=>{
    res.send("hello world");
})

app.post('/register', async (req,res)=>{
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password
        })
        res.json({status:'ok'});

    }
    catch(err){
        console.log(err);
        res.status(404).send('email already registered');
    }
})


app.post('/login', async (req,res)=>{
    const user= await User.findOne({
        email: req.body.email,
        password:req.body.password
    })
    

    if(user){
        const token= jwt.sign({
            email:user.email,
            password: user.password

        },'123password')
        return res.json({status:'ok', user:token});
    }
    else{
        return  res.json({status: 'error', user:false});
    }
})




app.listen(5000, ()=>{
    console.log("listening on port 5000");
})