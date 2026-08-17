import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true   
    },
    skill:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Skills',
        required:true
    },
    slot:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"AvailabilitySlot"
    },
    scheduledFor:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','confirmed','completed','cancelled'],
        default:'pending'
    },
},{timestamps:true});
export const Booking = mongoose.model('Booking',bookingSchema);
export default Booking;

