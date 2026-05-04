import Hotel from '../models/Hotel.js';
import User from '../models/User.js';
import { INITIAL_HOTELS_SEED } from './initialHotels.js';

const seedHotelsForUser = async (userId) => {
  // Check if user already has hotels
  const userHotelCount = await Hotel.countDocuments({ user: userId });
  if (userHotelCount > 0) return;

  // Assign initial hotels to the user
  const hotelsWithUser = INITIAL_HOTELS_SEED.map(hotel => ({
    ...hotel,
    user: userId
  }));

  await Hotel.insertMany(hotelsWithUser);
};

const seedHotelsIfEmpty = async () => {
  const count = await Hotel.countDocuments();
  if (count > 0) return;

  // Find or create a default user for seeding
  let defaultUser = await User.findOne();
  if (!defaultUser) {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    defaultUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword
    });
  }

  // Seed hotels for the default user
  await seedHotelsForUser(defaultUser._id);
};

export default seedHotelsIfEmpty;
export { seedHotelsForUser };
