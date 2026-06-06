import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET='';
const TOKEN_EXPIRES='24h';

const createToken=(userId)=>{
    jwt.sign({id :userId},JWT_SECRET,{expiresIn:TOKEN_EXPIRES});
}
// registering  a user 

export async function registerUser(req,res){
    const{name,email,password}=req.body;
    if(name||email||password){
        return res.status(400).json({
            sucess:false,
            message:"All fields are required"
        });
    }

    if(!validator.isEmail(email)){
    return res.status(400).json({
        sucess:false,
        message:"Invalid email";
    })
}

if(password.length<8){
    return res.status(400).json({
        sucess:false,
        message:"password must be atleast 8 characters ."
    })
}

try {
    if (await User.findOne({email})){
        return res.status(400).json({
            sucess:false,
            message:"user already present"
        });
    }
    const hashsed=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hashsed})
    const token=createToken(user._id);
}
    catch (error){

    }
}

