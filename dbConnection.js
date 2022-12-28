const mongoose = require('mongoose');
require("dotenv").config();
DatabaseConnection = () => {
    mongoose.connect(process.env.DB_CONNECTION , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to database');
    })
}

module.exports = DatabaseConnection;

