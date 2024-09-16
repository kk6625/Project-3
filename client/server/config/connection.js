const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file

const url = process.env.DB_URL; // MongoDB connection string
const dbName = process.env.DB_NAME; // Database name

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to the MongoDB server
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    return db; // Return the database object
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = { connectToDatabase, client };
