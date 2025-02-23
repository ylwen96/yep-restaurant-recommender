const express = require("express");
const router = express.Router();
const db = require("../model/restaurantDB")

router.get("/:id", (req, res) => {
    db.getRestaurantById(req.params.id)
        .then((resInfo) => {
            res.status(200).json(resInfo);
        })
        .catch(err => {
            res.status(400).json({ "message": "Resource not found" + err })
        })
});

module.exports = router;
