const mongoose = require("./mongoose")

const mongoURI = process.env.mongoURI;

const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

}

module.exports = connectDB;