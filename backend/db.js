const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
    try {
        // await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.by8ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
            await mongoose.connect('mongodb+srv://dbGabo:qwerty1234@cluster0.by8ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado exitosamente');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;