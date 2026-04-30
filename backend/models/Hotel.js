import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    address: { type: String, required: true, trim: true, maxlength: 500 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 50 },
    priceLabel: { type: String, required: true, trim: true, maxlength: 120 },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Hotel', hotelSchema);
