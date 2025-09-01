import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config({ path: new URL('../../.env', import.meta.url).pathname });

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  const pass = await bcrypt.hash('password123', 10);
  await User.create([
    { name: 'Ada Lovelace', email: 'ada@example.com', passwordHash: pass },
    { name: 'Grace Hopper', email: 'grace@example.com', passwordHash: pass },
  ]);
  console.log('Seeded users');
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
