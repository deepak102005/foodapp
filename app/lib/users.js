import fs from 'fs';
import path from 'path';
import { hashPassword } from './auth';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// In-memory fallback
let usersCache = null;

// Initial seed demo user
async function getSeedUsers() {
  const hashedPassword = await hashPassword('password123');
  return [
    {
      id: 'usr_deepak_01',
      name: 'Deepak',
      email: 'deepak@clearbite.com',
      password: hashedPassword,
      avatar: '/user-deepak.jpg',
      createdAt: new Date().toISOString(),
    },
  ];
}

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error ensuring data directory:', err);
    return false;
  }
}

export async function getAllUsers() {
  if (usersCache) {
    return usersCache;
  }

  const exists = ensureDataFile();
  if (exists) {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      usersCache = JSON.parse(data);
      return usersCache;
    } catch (err) {
      console.error('Failed to read users file, resetting with seed:', err);
    }
  }

  usersCache = await getSeedUsers();
  try {
    ensureDataFile();
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersCache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write seed users to file:', err);
  }
  return usersCache;
}

export async function findUserByEmail(email) {
  const users = await getAllUsers();
  const normalized = (email || '').trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export async function findUserById(id) {
  const users = await getAllUsers();
  return users.find((u) => u.id === id) || null;
}

export async function createUser({ name, email, password, avatar }) {
  const users = await getAllUsers();
  const normalizedEmail = (email || '').trim().toLowerCase();

  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('A user with this email already exists.');
  }

  const hashedPassword = await hashPassword(password);
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    avatar: avatar || '/user-deepak.jpg',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  usersCache = users;

  try {
    ensureDataFile();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist user to file:', err);
  }

  // Return user without password
  const { password: _, ...safeUser } = newUser;
  return safeUser;
}
