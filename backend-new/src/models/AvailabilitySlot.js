import mongoose from "mongoose";
const availabilitySchema = new mongoose.Schema({
    start:{type:Date,required:true},
    end:{type:Date,required:true},
    admin:{type:mongoose.Schema.ObjectId,ref:"User",required:true},
    skill:{type:mongoose.Schema.ObjectId,ref:"Skills",required:true},
    isBooked:{type:Boolean,default:false},
},{timestamps:true});

availabilitySchema.index({admin:1,start:1,end:1},{unique:true});
export const AvailabilitySlot = mongoose.model("AvailabilitySlot",availabilitySchema);