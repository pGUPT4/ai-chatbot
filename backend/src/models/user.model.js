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
        user_id VARCHAR(36) NOT NULL,
        role ENUM('user', 'assistant') NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

// user authentication - START
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
  const { id, email, password } = userData;
  await pool.query(
    'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
    [id, email, password]
  );
  return { id, email };
};
// user authentication - END

// chat cookie management - START
export const findChatsByUserId = async (userId) => {
  const pool = await connectDB();
  const [rows] = await pool.query('SELECT role, message, timestamp FROM chats WHERE user_id = ? ORDER BY timestamp ASC', [userId]);
  return rows;
};
// chat cookie management - END


// chat management - START
export const createChat = async (chatData) => {
  const pool = await connectDB();
  const { user_id, role, message } = chatData;
  const [rows] = await pool.query(
    'INSERT INTO chats (user_id, role, message) VALUES (?, ?, ?)',
    [user_id, role, message]
  );
  return rows;
};

export const deleteChatsByUserId = async (userId) => {
  const pool = await connectDB();
  await pool.query('DELETE FROM chats WHERE user_id = ?', [userId]);
};

export const isEmptyChat = async (userId) => {
  const pool = await connectDB();
  const [results] = await pool.query('SELECT COUNT(*) as count FROM chats WHERE user_id = ?', [userId]);
  
  return results.count === 0;
};
// chat management - END