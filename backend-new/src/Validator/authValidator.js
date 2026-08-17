import {z} from 'zod';
export const registerSchema = z.object({
    name:z.string().min(2,"Name is too short"),
    email:z.string().email('Email Inavlid'),
    password : z.string().min(6,"password must be at least 6 character"),
    role:z.enum(["user","admin"],{message:"Role must be either user or admin"})
});

export const loginSchema = z.object({
    email:z.string().email('Invalid Email'),
    password:z.string().min(1,"Password is required")
});

export const updateSchema= z.object({
    name:z.string().min(2,"Name is too short").optional(),
    email:z.string().email("Invalid Email").optional(),
    password:z.string().min(6,"Password must be at least 6 character").optional()
});

