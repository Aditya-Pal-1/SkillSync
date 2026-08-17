import z from 'zod';

export const skillSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
    description: z.string().optional(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced'], { message: "Level must be one of 'Beginner', 'Intermediate', or 'Advanced'" }),
});