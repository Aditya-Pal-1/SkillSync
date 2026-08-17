import {z} from 'zod';
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id format");
export const createSlotSchema=z.object({    
    skill:objectId,
    start:z.coerce.date().refine((d)=>d > new Date(),"Start must be in future"),
    end:z.coerce.date()
})
.refine((v)=>v.end > v.start,{message:"End must be after the start",path:["end"]})