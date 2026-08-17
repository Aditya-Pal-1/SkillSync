import {Router} from 'express';
import { register,login,getMe,logout,refresh,updateMe } from '../controllers/authController.js';
import { registerSchema,loginSchema,updateSchema } from '../Validator/authValidator.js';
import { Validate } from '../middleware/Validate.js';
import { protect } from '../middleware/authMiddleware.js';


const router = Router();
router.post('/register',Validate(registerSchema),register);
router.post('/login', Validate(loginSchema),login);
router.get('/me',protect,getMe);
router.post('/refresh',refresh);
router.post('/logout',protect,logout);
router.put('/updateMe',protect,Validate(updateSchema),updateMe)

export default router;

