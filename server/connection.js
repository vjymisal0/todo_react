const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017"
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(mongoURI)
        if (connection) {
            console.log('Database connected successfully')
        }
        else {
            console.log('Database connection failed')
        }

    }
    catch (err) {
        console.log(err, "Database connection failed")
    }
}

module.exports = { connectDB };


