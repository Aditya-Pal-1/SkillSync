import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from './asyncHandler.js';
export const protect=asyncHandler(async(req,res,next)=>{
    console.log("Authorization:", req.headers.authorization);
    const header = req.headers.authorization || "";
    if(!header.startsWith("Bearer ")){
        return res.status(401).json({error : "No autherized, no token"});
    }
    const token = header.split(" ")[1];
    let decoded;
    try{
        console.log(token,process.env.JWT_ACCESS_SECRET);
        decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
    }
    catch{
        return res.status(401).json({error : "Inavlid token or expired"});
    }
    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(401).json({error:"user no longer exist"});
    }
    req.user = user;
    next();
})