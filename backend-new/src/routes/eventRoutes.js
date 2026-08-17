import { Router } from "express";
import { createEvent,getAllEvents,updateEvent,deleteEvent,getEventById } from "../controllers/eventController.js";
import { Validate } from "../middleware/Validate.js";
import { updateEventSchema, eventCreateSchema} from "../Validator/eventValidator.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/",protect,Validate(eventCreateSchema),createEvent);
router.get("/",getAllEvents);
router.get("/:id",getEventById);
router.patch("/:id",Validate(updateEventSchema),updateEvent);
router.delete("/:id",deleteEvent);

export const eventRoute = router;