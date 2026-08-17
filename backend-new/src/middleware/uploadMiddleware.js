import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"skill-platform",
        allowed_formats:["jpg","jpeg","png","webp","pdf"],
        resource_type:"auto"
    }
});

export const upload = multer({
    storage,
    limits:{
        fileSize:10*1024*1024 //10mb
    }
});
