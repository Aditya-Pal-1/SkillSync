import express from "express";
import { createSkill, getSkills, getSkillById, updateSkill, deleteSkill } from "../controllers/SkillsController.js";
import { Validate } from "../middleware/Validate.js";
import { skillSchema} from "../Validator/skillValidator.js";
import { queryValidate } from "../middleware/queryValidate.js";
import { querySchema } from "../Validator/queryValidator.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.post('/',protect ,
    upload.fields([
        {
        name:"image",
        maxCount:1
        },
        {
            name:"documents",
            maxCount:5
        }
    ]),
    Validate(skillSchema), 
    createSkill);
router.get('/', queryValidate(querySchema),  getSkills);
router.get('/:id', getSkillById);
router.put('/:id', Validate(skillSchema), updateSkill);
router.delete('/:id', deleteSkill);

export default router;