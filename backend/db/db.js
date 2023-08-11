const mongoose = require('mongoose');

// Define a function named 'db' for handling database connection
const db = async () => {
    try {
        // Disable strict mode for MongoDB queries (allows for more flexible updates)
        mongoose.set('strictQuery', false);

        // Connect to the MongoDB database using the URL from the environment variable
        await mongoose.connect(process.env.MONGO_URL);

        // Log a success message after connecting to the database
        console.log(`Connected to DB: ${process.env.MONGO_URL}`);
    } catch (error) {
        // If there's an error during the database connection, log the error message
        console.log("DB Connection Error:", error);
    }
};

// Export the 'db' function to make it accessible from other parts of the application
module.exports = db;
