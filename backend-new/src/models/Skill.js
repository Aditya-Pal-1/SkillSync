import mongoose from "mongoose";
import { string, url } from "zod";

const skillDocumentSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    resourceType:{
        type:String,
        required:true
    },
},
{_id : true},
)

const skillSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    level:{type:String,enum:[
        "Beginner",
        "Intermediate",
        "Advanced"
    ],required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    image: {
      url: String,
      publicId: String,
    },
    documents:[skillDocumentSchema],
}, {timestamps:true});

const Skills = mongoose.model('Skills',skillSchema);
export default Skills;