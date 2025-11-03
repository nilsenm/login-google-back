const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(' esta conectado a la base de datos');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
} ;
module.exports = {
    connectDB
}