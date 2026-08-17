import Event from "../models/Event.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { success } from "zod";
export const createEvent=asyncHandler(async(req,res)=>{
    const {eventName,eventType,eventDate,location,organizer} = req.body;
    const event = new Event({eventName,eventType,eventDate,location,organizer});
    await event.save();
    res.status(201).json(event);
});

export const getAllEvents=asyncHandler(async(req,res)=>{
    const events = await Event.find();
    res.status(201).json(events);
})
export  const getEventById=asyncHandler(async(req,res)=>{
    const event = await Event.findById(req.params.id);
    if(!event){
        return res.status(404).json({error : "event not found"});
    }
    res.status(201).json(event);
});
export const updateEvent=asyncHandler(async(req,res)=>{
    const {eventName,eventType,eventDate,location,organizer} = req.body;
    const event = await Event.findByIdAndUpdate (req.params.id,{eventName,eventType,eventDate,location,organizer},{new:true});
    if(!event){
        return res.status(404).json({
            success:false,
            error:"No event found"
        });
    }
    res.status(201).json(event);

 });

 export const deleteEvent=asyncHandler(async(req,res)=>{
    const event = await Event.findByIdAndDelete(req.params.id);
    if(!event){
        return res.status(404).json({error : "event not found"});
    }
    res.status(201).json({message : "Event deleted successfully"});
 })