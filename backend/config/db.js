const mongoose = require("mongoose");

let isConnected = false;

const mongodb_connect = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        isConnected = true;
        console.log('✅ MongoDB connected successfully!');
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
            isConnected = false;
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
            isConnected = true;
        });
        
    } catch (error) { 
        console.error('❌ MongoDB connection failed:', error);
        isConnected = false;
        throw error;
    }
};

// Export connection status check
const checkConnection = () => {
    return isConnected && mongoose.connection.readyState === 1;
};

module.exports = { mongodb_connect, checkConnection };
