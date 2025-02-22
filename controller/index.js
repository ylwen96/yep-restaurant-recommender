const express = require("express");
const router = express.Router();

// GET: /restaurants
router.get("/", (req,res)=>{
    res.send("restaurants list routes")
});

module.exports = router;
