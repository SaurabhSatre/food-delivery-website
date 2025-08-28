const express = require("express");

// It should be declared at the start then it works for entire project
// It is used to load environment variables from a specific configuration file
const dotenv = require('dotenv');
dotenv.config({path : "./config/config.env"});

// Connecting to the database
const { mongodb_connect, checkConnection } = require("./config/db");

const app = express();
app.use(express.json());    // It is used to parse incoming requests with JSON payloads

// It is middleware whch allows the specified server to access the backend server 
app.use((req , res , next)=>{
    // Allow multiple origins for production
    const allowedOrigins = [
        process.env.FrontendWebAddress,
        'https://food-delivery-website-frontend-nu.vercel.app', // Replace with your actual frontend domain
        'http://localhost:3000'
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With , Content-Type , Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})

// Database connection middleware
app.use(async (req, res, next) => {
    try {
        if (!checkConnection()) {
            console.log('🔄 Attempting to reconnect to database...');
            await mongodb_connect();
        }
        next();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        res.status(503).json({ 
            success: false, 
            message: 'Database connection failed. Please try again.' 
        });
    }
});

// Routed Imported 
const userRoute = require("./routes/userRoute.js");
const displayData = require("./routes/DisplayData.js");
const OrderData = require("./routes/OrderData.js");
const FoodItem = require ("./routes/FoodItem");
const UsersData = require ("./routes/UsersData");
const AdminRoute = require ("./routes/Admin.js");

// Routes used
app.use("/api" , userRoute );
app.use("/api" , displayData );
app.use("/api" , OrderData );
app.use("/api" , FoodItem );
app.use("/api" , UsersData );
app.use("/api/admin" , AdminRoute );

// Health check endpoint for Vercel
app.get("/", (req, res) => {
    const dbStatus = checkConnection() ? 'connected' : 'disconnected';
    res.json({ 
        message: "HungryHub Backend API is running!", 
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// Initialize database connection
const initializeServer = async () => {
    try {
        await mongodb_connect();
        
        // It  is used to start a server that listens on port mentioned in confuguration file
        const PORT = process.env.PORT || 5000;
        app.listen(PORT , ()=>{
            console.log(`🚀 Server running at http://localhost:${PORT}/`);
            console.log(`📊 Database status: ${checkConnection() ? 'Connected' : 'Disconnected'}`);
        });
    } catch (error) {
        console.error('❌ Failed to initialize server:', error);
        process.exit(1);
    }
};

// Start the server
initializeServer();

// The dotenv package is commonly used to load environment variables from a configuration file 