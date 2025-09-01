import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export async function listUsers(_req, res) {
  const users = await User.find().select('-passwordHash');
  res.json(users);
}

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
}
