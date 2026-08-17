import { asyncHandler } from "../middleware/asyncHandler.js";
import Skill from "../models/Skill.js";
import { AvailabilitySlot } from "../models/AvailabilitySlot.js";
import { success } from "zod";

export const createSlot=asyncHandler(async(req,res)=>{
    
    const{skill : skillId,start,end} = req.body;
    const skill = await Skill.findById(skillId);
    console.log("Skill found:", skill._id);
    console.log("Skill owner:", skill.owner);
    console.log("Current admin:", req.user._id);
    if(!skill){
        return res.status(404).json({error:"skill not found"});
    }
    if(String(skill.owner) !== String(req.user._id)){
        return res.status(403).json({error : "you can only add slots to your skill"});
    }
    const slot = await AvailabilitySlot.create({
        admin:req.user._id,
        skill:skillId,
        start,
        end
    })
    res.status(201).json({success:true,data:slot});;
});

export const getMySlots=asyncHandler(async(req,res)=>{
    // const slot = await AvailabilitySlot.find({teacher:req.user._id}).populate("skill","name level").sort("start")
    const uid = req.user._id;
    // console.log(await AvailabilitySlot.collection.indexes());
//     await AvailabilitySlot.collection.dropIndex(
//   "teacher_1_startTime_1_endTime_1"
// );

// await AvailabilitySlot.collection.dropIndex(
//   "admin_1_startTime_1_endTime_1"
// );

// await AvailabilitySlot.collection.dropIndex(
//   "admin_1_start_1_endTime_1"
// );
// console.log(await AvailabilitySlot.collection.indexes());
// console.log("Old indexes deleted");
    const slots = await AvailabilitySlot.find({admin:uid})
    .populate("skill","name level")
    .populate("admin","name email")
    .sort("start");
    res.status(201).json({success:true,data:slots});
});


export const getOpenSlotForSkill=asyncHandler(async(req,res)=>{
    const slot = await AvailabilitySlot.find({
        skill:req.params.skillId,
        isBooked:false,
        start:{$gt: new Date()}
    }).sort("start");
    res.status(201).json({success:true,data: slot});
});

export const deleteSlot = asyncHandler(async (req, res) => {
  const slot = await AvailabilitySlot.findById(req.params.id);
  if (!slot) return res.status(404).json({ error: "Slot not found" });
  if (String(slot.admin) !== String(req.user._id)) {
    return res.status(403).json({ error: "You can only delete your own slots" });
  }
  if (slot.isBooked) {
    return res.status(409).json({ error: "Booked slots cannot be deleted" });
  }
  await slot.deleteOne();
  res.json({ success: true, data: slot });
});