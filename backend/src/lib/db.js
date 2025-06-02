// import mongoose from 'mongoose';

// export const connectDB = async() => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log('MongoDB connectivity error:', error)
//     }
// }

import mysql from 'mysql';

export let connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) return console.error('Error connecting to the database: ', err.message);

    console.log('Connected to the database.');
})