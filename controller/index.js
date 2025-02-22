const express = require("express");
const router = express.Router();
const RestaurantDB = require("../model/restaurantDB");


// GET: /restaurants
router.get("/", (req,res)=>{
    let db = new RestaurantDB()
    db.initialize();
});

module.exports = router;
