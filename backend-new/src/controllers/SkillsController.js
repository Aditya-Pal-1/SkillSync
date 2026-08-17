import Skill from "../models/Skill.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { url } from "zod";
import {AvailabilitySlot} from "../models/AvailabilitySlot.js";

export const createSkill = asyncHandler(async (req, res)=>{
        const{name,description,level} = req.body;

        const imageFile = req.files?.image?.[0];
        const documentFiles = req.files?.documents || [];


        const skill = new Skill({name,
            description,
            level,
            owner:req.user._id,
            image:imageFile 
            ? { 
                url:imageFile.path,
                publicId:imageFile.filename
            }
            : undefined,

            documents:documentFiles.map((file)=>({
                url:file.path,
                publicId:file.filename,
                originalName : file.originalname,
                resourceType:file.resouce_type,
            })),
            
        });
        await skill.save();
        res.status(201).json(skill);
        console.log("recorded created") ;
});

// export const getSkills =asyncHandler(async (req, res)=>{
//         const skills = await Skill.find();
//         res.status(200).json(skills);
// });
export const getSkills =asyncHandler(async (req, res)=>{
        const{page,limit,category,level,search,available,sort="name"} = req.query;
        const filter = {};
        if(category) filter.category = category;
        if(level) filter.level = level;
        if(search) filter.name = {$regex:search,$options:'i'};//This line is used to search for a skill by name, ignoring uppercase/lowercase.
        const skip = (page - 1) * limit;
         
        const sortOption = {
            name: { name: 1 },
            "-name": { name: -1 },
            createdAt: { createdAt: 1 },
            "-createdAt": { createdAt: -1 },  
        };

        const sortQuery = sortOption[sort] || { createdAt: 1 };
         if (available === "true" || available === "false") {

        const availableSkillId = await AvailabilitySlot.distinct("skill", {
            isBooked: false,
            start: {
                $gt: new Date(),
            },
        });

        if (available === "true") {
            filter._id = {
                $in: availableSkillId,
            };
        }

        if (available === "false") {
            filter._id = {
                $nin: availableSkillId,
            };
        }
    }


        const [skills,total] = await Promise.all([
            Skill.find(filter).sort(sortQuery).skip(skip).limit(limit),
            Skill.countDocuments(filter)
        ]);
        res.status(200).json({
            success:true,
            count:skills.length,
            pagination:{
                total,
                page,
                limit,
                pages:Math.ceil(total/limit),
            },
            data:skills
        });
});





export const getSkillById = asyncHandler(async (req, res)=>{
        const skill = await Skill.findById(req.params.id);
        if(!skill){
            return res.status(404).json({message: "Skill not found"});
        }
        res.status(200).json(skill);
   
});

export const updateSkill = asyncHandler(async (req, res)=>{
   
        const{name, description, level} = req.body;
        const skill = await Skill.findByIdAndUpdate(req.params.id, {name, description, level},{new:true});
        if(!skill){
            return res.status(404).json({message: "Skill not found"});  
        } 
        res.status(200).json(skill);
});

export const deleteSkill = asyncHandler(async(req,res)=>{
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if(!skill){
            return res.status(404).json({message: "Skill not found"});
        }
        res.status(200).json({message: "Skill deleted successfully"});
});
