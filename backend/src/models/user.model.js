import { connectDB } from '../lib/db.js';

export const initializeDatabase = async () => {
  const pool = await connectDB();
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    // Create chats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chats (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        role VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Initialize database when the module is imported
initializeDatabase();

export const findUserByEmail = async (email) => {
  const pool = await connectDB();
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const pool = await connectDB();
  const [rows] = await pool.query('SELECT id, email FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const createUser = async (userData) => {
  const pool = await connectDB();
  const { id, name, email, password } = userData;
  await pool.query(
    'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
    [id, email, password]
  );
  return { id, email };
};

export const createChat = async (chatData) => {
  const pool = await connectDB();
  const { id, user_id, role, content } = chatData;
  await pool.query(
    'INSERT INTO chats (id, user_id, role, content) VALUES (?, ?, ?, ?)',
    [id || uuidv4(), user_id, role, content]
  );
  return { id: id || uuidv4(), user_id, role, content };
};

export const findChatsByUserId = async (userId) => {
  const pool = await connectDB();
  const [rows] = await pool.query('SELECT id, role, content FROM chats WHERE user_id = ?', [userId]);
  return rows;
};

export const deleteChatsByUserId = async (userId) => {
  const pool = await connectDB();
  await pool.query('DELETE FROM chats WHERE user_id = ?', [userId]);
};