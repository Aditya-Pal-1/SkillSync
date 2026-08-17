import { asyncHandler } from "../middleware/asyncHandler.js";
import Booking from "../models/Booking.js";
import Skills from "../models/Skill.js";
import {errorHandler} from "../middleware/errorHandler.js";
import { success } from "zod";
import { AvailabilitySlot } from "../models/AvailabilitySlot.js";
// export const createBooking = asyncHandler(async (req, res) => {
//     const { skill :skillId, scheduledFor } = req.body;
//     const skill = await Skills.findById(skillId);
//     if(!skill) {
//         errorHandler(new Erorr("Skill not found"),req,res);
//         return;
//     }
//     const existBooking = await Booking.findOne({
//         skill:skillId,
//         scheduledFor
//     })
//     if(existBooking){
//         errorHandler(new Error("skill is already booked for this time"),req,res)
//         return;
//     }
//     const studentId = req.user._id;
//     const booking = await Booking.create({
//         student: studentId,
//         teacher: skill.owner,
//         skill: skill._id,
//         scheduledFor
//     });
//     res.status(201).json({ success: true, data: booking });
// });
export const createBooking = asyncHandler(async (req, res) => {
  const { slot: slotId } = req.body; //TODO you can change this to availabilitySlot reference if you want to use the slot instead of skill and scheduledFor

  // atomic operation to find the slot and mark it as booked fails if the slot is already booked used to prevent race conditions where two users try to book the same slot at the same time
  console.log("🔥 CREATE BOOKING START");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  const slot = await AvailabilitySlot.findOneAndUpdate(
    { _id: slotId, isBooked: false },
    { isBooked: true },
    { new: true }
  );
  if (!slot) return res.status(409).json({ error: "Slot already booked" });

  // Can't book your own class.
  if (String(slot.admin) === String(req.user._id)) {
    slot.isBooked = false;
    await slot.save(); // release what we just claimed
    return res.status(400).json({ error: "You can't book your own slot" });
  }
  console.log("🔥 ABOUT TO CREATE BOOKING");
  const booking=await Booking.create({
      user: req.user._id,
      admin: slot.admin,
      skill: slot.skill,
      slot: slot._id,
      scheduledFor: slot.start,
      status: "pending",
    });
//   let booking;
//   try {
//     booking = await Booking.create({
//       student: req.user._id,
//       teacher: slot.teacher,
//       skill: slot.skill,
//       slot: slot._id,
//       scheduledFor: slot.start,
//       status: "pending",
    // });
//   } catch (error) {
//     await AvailabilitySlot.findByIdAndUpdate(slot._id, { isBooked: false });
//     throw error;
//   }

//   await User.findByIdAndUpdate(req.user._id, {
//     $addToSet: { roles: "student" },
//   });
    console.log("✅ BOOKING CREATED:", booking);
  res.status(201).json({ success: true, data: booking });
});
export const getbookingById = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
    .populate('user',"name email")
    .populate('admin',"name email")
    .populate('skill',"name category level");  
    if(!booking){
        erorHandler(new Error("Booking not found"),req,res);
        return;
    } 
    res.status(200).json({ success: true, data: booking });
}); 

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    $or: [{ user: req.user._id }, { admin: req.user._id }],
  })
    .populate("user", "name email")
    .populate("admin", "name email")
    .populate("skill", "name description level")
    .populate("slot", "start end")
    .sort("-createdAt");
    console.log("getting my bookings",bookings)
  res.status(200).json({ success: true, data: bookings });
});

export const confirmBooking=asyncHandler(async(req,res)=>{
    const booking = await Booking.findById(req.params.id);
    if(!booking){
       return res.status(404).json({error:"Booking not found"});
    }
    if(String(booking.admin) !== String(req.user._id)){
        return res.status(403).json({error:"You can confirm only your booking"})
    };
    booking.status ="confirmed";
    await booking.save();
    res.status(200).json({success:true,data : booking});
})

export const completeBooking=asyncHandler(async(req,res)=>{
    const booking = await Booking.findById(req.params.id);
    if(!booking){
        return res.status(404).json({error:"Booking not found"});
    }
    if(String(booking.admin) !== String(req.user._id)){
        return res.status(403).json({error:"You can complete only your booking"})
    };
     if(booking.status !== "confirmed") {
    return res.status(400).json({ error: "Booking must be confirmed before it can be completed" });
    }
    booking.status="completed";
    await booking.save();
    res.status(200).json({success:true,data : booking});
});

export const cancelBooking=asyncHandler(async(req,res)=>{
    const booking = await Booking.findById(req.params.id);
    if(!booking){
        return res.status(404).json({error:"Booking not found"});
    }
    if(String(booking.user) !== String(req.user._id)&& String(booking.admin) !== String(req.user._id)){
        return res.status(403).json({error:"You can cancel only your booking"})
    };
     if (!["pending", "confirmed"].includes(booking.status)) {
    return res.status(400).json({ error: "This booking cannot be cancelled" });
    }
    booking.status="cancelled";
    await booking.save();
    await AvailabilitySlot.findByIdAndUpdate(booking.slot, { isBooked: false });
    res.status(200).json({success:true,data : booking});
})