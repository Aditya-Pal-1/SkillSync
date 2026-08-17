import {z} from 'zod';

export const eventCreateSchema=z.object({
    eventName:z.string().min(5,{message:"Event Name is required"}).max(20,{message:"Characters nust be less than 20"}),
    eventType:z.enum(["Workshop","Seminar","Conference","Meeting","Webinar","Training",{message:"Event type must among the dropdown"}]),
    eventDate:z.coerce.date(),
    location:z.enum(["Hyderabad","Banglore","Delhi",{message:"locaton must be among the dropdown"}]),
    organizer:z.string().min(5,{message:"Organizer name is required"}).max(10,{message:"character must be less than"})
});


export const updateEventSchema=z.object({
    eventName:z.string().optional(),
    eventType:z.enum(["Workshop","Seminar","Conference","Meeting","Webinar","Training",{message:"Event type must among the dropdown"}]).optional(),
    eventDate:z.coerce.date().optional(),
    location:z.enum(["Hyderabad","Banglore","Delhi",{message:"locaton must be among the dropdown"}]).optional(),
    organizer:z.string().optional()
});
