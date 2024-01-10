import express from 'express';
import {User,validate} from '../models/UserModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/',async (req,res) => {
    console.log(req.body);
    try{

        const {error}= validate(req.body);
        if(error) return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email});
        if(user) {console.log("user exists"); return res.status(409).send({message:"User with given email already exists"})}
        if(req.body.password!==req.body.confirmPassword) return res.status(409).send({message:"Password and Confirm Password must be same."})
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        await new User({...req.body,password:hashPassword}).save();
        console.log("ok")
        res.status(201).send({message:"User created successfully"})
    }catch(error){
        res.status(500).send({message:"internal server error"});
    }
})

export default router;