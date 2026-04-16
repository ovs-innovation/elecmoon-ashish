require("dotenv").config();
const mongoose = require("mongoose");

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  console.log("🔄 Connecting to MongoDB...");
  try {
    cachedDb = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
    return cachedDb;
  } catch (err) {
    console.log("❌ MongoDB connection failed!", err.message);
    throw err;
  }
};

module.exports = {
  connectDB,
};
