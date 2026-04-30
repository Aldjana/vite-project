import express from 'express';
import { createHotel, listHotels, updateHotel, deleteHotel } from '../controllers/hotelController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, listHotels);
router.post('/', authMiddleware, createHotel);
router.put('/:id', authMiddleware, updateHotel);
router.delete('/:id', authMiddleware, deleteHotel);

export default router;
