import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    refreshTokens:{type:[String],default:[],select:false},
    skills:[{type:mongoose.Schema.Types.ObjectId,ref:'Skills'}],
    role:{type:String,enum:["user","admin"],default:'user'},
},{timestamps:true});

userSchema.pre("save", async function(next){
    console.log("pre save hook triggered for use  : " , this);
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log("login successful");
    return await bcrypt.compare(candidatePassword,this.password);
}

const User = mongoose.model('User',userSchema); 
export default User;