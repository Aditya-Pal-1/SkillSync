import jwt from "jsonwebtoken";
import User from '../models/User.js'
import { asyncHandler } from "../middleware/asyncHandler.js";
// import {ApiError} from '../utils'
// const signAccess = (userId)=>{
//     return jwt.sign({id:userId}, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN || "7d"} )
// }

const signAccess=((userId)=>{
    return jwt.sign({id:userId},process.env.JWT_ACCESS_SECRET,{expiresIn:"15m"});
})
const signRefresh=((userId)=>{
    return jwt.sign({id:userId},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"})
})
const publicUser = (u)=>({_id : u._id , name:u.name , email : u.email,role:u.role});

const sendTokens= async(res,user,statusCode=200)=>{
    const accessToken = signAccess(user._id);
    const refreshToken = signRefresh(user._id);
    if(!user.refreshTokens) user.refreshTokens=[];
    user.refreshTokens.push(refreshToken);
    await user.save();

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        path:"/auth",
        maxAge:7*24*60*60*1000
    });
    res.status(statusCode).json({user:publicUser(user),token:accessToken});
}

export const register=asyncHandler(async(req,res)=>{
    const {name, email, password,role} = req.body;
    const exist =await User.findOne({email});
    if(exist){
        return res.status(409).json({error : "Email already in use"});
    }
    const user = await User.create({name,email,password,role});
    console.log("user added in db");
    // const accessToken = signAccess(user._id);
    // const refreshToken = signRefresh(user._id);
    await sendTokens(res,user,201);
    // res.status(201).json({user : publicUser(user) , token});
});

export const login=asyncHandler(async(req,res)=>{
    const{email , password} = req.body;
    const user = await User.findOne({email}).select("+password +refreshTokens");
    if(!user ||  !(await user.comparePassword(password))){
        // throw new ApiError(401,"Invalid Credentials");
        
        return res.status(404).json({message:"invalid credentials"});
    }
    // const accessToken = signAccess(user._id);
    // const refreshToken = signRefresh(user._id);
    await sendTokens(res,user);
    console.log(user);
    // res.status(201).json({user:publicUser(user) , token});
});

export const getMe=asyncHandler(async(req,res)=>{
    res.json({user:publicUser(req.user)})
});

export const refresh=asyncHandler(async(req,res)=>{
    const token = req.cookies?.refreshToken;
    if(!token){
        return res.status(401).json({error:"no refreshToken"});
    }
    let decode;
    try{
        decode = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
    }
    catch{
        return res.status(401).json({error : "refresh token expired or invalid"});
    }
    const user = await User.findById(decode.id).select("+refreshTokens");
    if(!user || !user.refreshTokens.includes(token)){
        return res.status(401).json({error : "Refresh token revoked"});
    }
    user.refreshTokens = user.refreshTokens.filter((t)=>t !== token);
    await sendTokens(res,user);
})

export const logout=asyncHandler(async(req,res)=>{
    const token = req.cookies?.refreshToken;
    if(token){
        await User.updateOne(
            {refreshTokens:token},
            {$pull:{refreshTokens:token}}
        )
    };
    res.clearCookie("refreshToken",{path:"/auth"});
    res.json({message:"Logged Out"})
});

export const updateMe=asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    if(name === undefined && email == undefined && password == undefined){
        return res.status(400).json({error :"No fields to update"});
    }
    const user = await User.findById(req.user._id).select("+password");
    if(!user){
        return res.status(404).json({error : "User does not found"});  
    }

    
    if(email != undefined && email != user.email){
        const emailTaken = await User.exists({email,_id:{$ne:user._id}});
        if(emailTaken){
            return res.status(409).json({error : "Email already in use"})
        }
    }
    if(name != undefined && name != user.name) user.name = name;
    if(email != undefined && email != user.email) user.email = email
    if(password != undefined && password !=user.password) user.password = password;
    // const user = await User.findByIdAndUpdate(req.user_id,{name:req.user.name,email:req.user.email,password:req.user,password},{new:true,runValidators:true});
    await user.save();
    res.json({user:publicUser(user)});
})