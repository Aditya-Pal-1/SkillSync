import {Router} from "express";
import { getMySlots, createSlot,getOpenSlotForSkill,deleteSlot } from "../controllers/slotController.js";
import { createSlotSchema } from "../Validator/SlotValidator.js";
import { protect } from "../middleware/authMiddleware.js";
import { Validate } from "../middleware/Validate.js";
import { authorize } from "../middleware/authorize.js";


const router = Router();

router.get("/skill/:skillId",getOpenSlotForSkill);
router.get("/mine",protect,getMySlots);
router.post("/",protect,authorize("admin"),Validate(createSlotSchema),createSlot);
router.delete("/:id",protect,authorize("admin"),deleteSlot);


export const slotRoutes = router;
