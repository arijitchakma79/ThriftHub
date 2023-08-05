const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to DB: ${process.env.MONGO_URL}`);
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};

module.exports = db;
