import userModel from "../models/userModel.js";

import jwt from'jsonwebtoken'

const JWT_SECRET="7165be951800b6cac4a87fb2cfa9b24c83d0858a4ddc0c329c3eee6d05374b84e333074e723878b1ed9972db86d89b2379220a430fdefd52144a69e5aa8e7ea7"

export default async function authMiddleware(req,res,next){
    const authHeader=req.headers.autherization;
    if (!authHeader||!authHeader.startsWith("Bearer ")){

        return res.status(401).json({
            sucess:false,
            message:"not autherized or token missing "
        });
    }
    const token =authHeader.split(" ")[1];

    //to verify
    try{

        const payload=jwt.verify(token,JWT_SECRET);
        const user=await UserActivation.findById(payload.id).select("-password");
        if(!user){
            return res.status(401).json({
                sucess:false,
                message:"user not found"
            });

        }
        req.user=user;
        next();
    }

    catch(err){
        console.log("JWT verification failed ")
    }   return res.status(401).json({
        sucess:false,
        message:"token invalid or expired "
    });

}