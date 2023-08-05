const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db');
const {readdirSync} = require('fs');
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/'+ route)))
const server = async () => {
    try {
        await db();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

server();
