const express = require('express');
const mongoose = require("mongoose");
const { checkConnection } = require('../config/db');

const router = express.Router();

// This route is used to give food Category Data and food Items data to the frontend
// Which displayed exact downside of the crousel
// according to food category , food items are arranged
router.post("/foodData" , async (req , res)=>{
    try {
        // Check database connection first
        if (!checkConnection()) {
            console.log('❌ Database not connected, attempting to reconnect...');
            return res.status(503).json({
                success: false,
                message: 'Database connection is not available. Please try again in a few seconds.'
            });
        }

        // Here we already connected mongoose to database 
        let foodItems = mongoose.connection.db.collection("food_items");
        let foodItemsdata = await foodItems.find({}).toArray();

        let foodCategory = mongoose.connection.db.collection("foodCategory");
        let foodCategoryData = await foodCategory.find({}).toArray();
        
        // Check if we got valid data
        if (!foodItemsdata || !foodCategoryData) {
            throw new Error('Failed to fetch data from database');
        }

        console.log(`✅ Successfully fetched ${foodItemsdata.length} food items and ${foodCategoryData.length} categories`);
        
        res.send([{success : true} ,foodCategoryData , foodItemsdata ]);
    }
    catch(error){
        console.error('❌ Error in /foodData route:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to load food data. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
})

module.exports = router ;