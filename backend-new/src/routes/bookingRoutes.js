import express from 'express';
import {Validate} from '../middleware/Validate.js';
import  {createBookingSchema}  from '../Validator/bookingValidator.js';
import { createBooking, getbookingById,getMyBookings,completeBooking,confirmBooking,cancelBooking } from '../controllers/bookingController.js';    
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
// router.use(protect);


router.get('/me',protect ,getMyBookings);
router.post('/',protect,Validate(createBookingSchema), createBooking);
router.get('/:id', protect, getbookingById);
router.patch('/:id/confirm',protect,confirmBooking);
router.patch('/:id/complete',protect,completeBooking);
router.patch('/:id/cancel',protect,cancelBooking);
export default router;