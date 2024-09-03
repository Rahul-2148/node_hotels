const mongoose = require('mongoose');

// Define the MongoDB connection URI
const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace 'your-database name' with your MongoDB connection URI, here my database is named 'hotels'

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

    