import express from "express";
import {User} from '../models/UserModel.js'
import Joi from "joi";
import bcrypt from 'bcrypt';
import PassComp from "joi-password-complexity";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/',async (req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message:error.details[0].message})
        }
        const user = await User.findOne({email:req.body.email})
        if(!user) {
            console.log("FFF");
            return res.status(401).send({message:'Invalid email or password.'});
        }
        console.log(user);
        const validPassword = await bcrypt.compare(
            req.body.password,user.password
        );
        console.log("VP : ",validPassword);
        if(!validPassword) return res.status(401).send({message:'Invalid email or password.'});
        const token = jwt.sign(
            {
                _email:user.email,
                _id: user._id,
                _name: user.name,
            },'tok'
        );
        console.log(token);
        res.status(200).send({data:token,message:"logged in successfully"})
    }
    catch(error){
        console.log("Errorr");
        res.status(500).send({message:"Internal Server Error"});
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email:Joi.string().required().label("Email"),
        password:Joi.string().required().label('Password')
    })
    return schema.validate(data);
}

export default router;