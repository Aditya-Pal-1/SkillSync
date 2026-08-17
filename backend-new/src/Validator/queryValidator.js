import z from 'zod';

export const querySchema = z.object({
    page: z.coerce.number().int("Page must be an integer").min(1).default(1),
    limit: z.coerce.number().int("Limit must be an integer").min(1).max(100).default(10),
    category:z.string().optional(),
    level:z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    search:z.string().trim().optional(),
    available: z.enum([
        "true",
        "false"
    ]).optional(),
    sort : z.enum(["name","-name","createdAt","-createdAt"]).optional()
});