import Hotel from '../models/Hotel.js';
import { INITIAL_HOTELS_SEED } from './initialHotels.js';

const seedHotelsIfEmpty = async () => {
  const count = await Hotel.countDocuments();
  if (count > 0) return;

  await Hotel.insertMany(INITIAL_HOTELS_SEED);
};

export default seedHotelsIfEmpty;
