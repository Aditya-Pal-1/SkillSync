// import z from 'zod';

// const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId format" });

// export const createBookingSchema = z.object({
//     skill:objectId,
//     scheduledFor: z.coerce.date().refine(date => date > new Date(), { message: "Scheduled date must be in the future" }),
// });

import z from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId format" });

export const createBookingSchema = z.object({
    slot:objectId
});


