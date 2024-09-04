const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URI
// const mongoURL = process.env.MONGODB_URL_LOCAL // Replace 'your-database name' with your MongoDB connection URL, here my database is named 'hotels'

const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB database connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB server
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log(`Connected to MongoDB server ${mongoURL}`);
});

db.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;

    