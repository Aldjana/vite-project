import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import seedHotelsIfEmpty from './seed/seedHotels.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json({ limit: '6mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);

app.get('/', (req, res) => {
  res.send('API RED PRODUCT fonctionne ');
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

(async () => {
  try {
    await connectDB();
    await seedHotelsIfEmpty();
    app.listen(PORT, HOST, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err);
    process.exit(1);
  }
})();