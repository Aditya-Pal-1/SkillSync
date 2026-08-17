import mongoose from "mongoose";
import { date, trim } from "zod";
import { _enum } from "zod/v4/core";

const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:[true,"Event Name is required"],
        trim:true
    },
    eventType:{
        type:String,
        required:true,
        enum:["Workshop","Seminar","Conference","Meeting","Webinar","Training",]
    },
    eventDate:{
        type:Date,
        required:true,
    },
    location:{
        type:String,
        required:true,
        enum:["Hyderabad","Banglore","Delhi"]
    },
    organizer:{
        type:String,
        required:[true,"Organizer name is required"],
        trim:true
    }
},{timestamps:true});

const Event = mongoose.model("Event",eventSchema);

export default Event;

