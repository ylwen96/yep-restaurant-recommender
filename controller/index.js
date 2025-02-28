const express = require("express");
const router = express.Router();
const db = require("../model/restaurantDB")

// GET: /restaurants get restaurants
router.get("/", (req, res) => {
    db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
        .then((data) => {
            res.status(200).render('main', { data: data, page: req.query.page, perPage: req.query.perPage, borough: req.query.borough });
        })
        .catch(err => {
            res.status(400).json(`oops! error found ` + err);
        })
});

// GET: /restaurants/:id get by restaurant id
router.get("/:id", (req, res) => {
    db.getRestaurantById(req.params.id)
        .then((data) => {
            res.status(200).render('detail', { data: data });
        })
        .catch(err => {
            res.status(400).json({ "message": "Resource not found" + err })
        })
});

// PUT: /restaurants/:id/comment
router.put("/:id/comment", async (req, res) => {
    let restaurantId = req.params.id;
    let { comment, grade } = req.body;

    try {
        let message = await db.addCommentToRestaurant(restaurantId, comment, grade);
        res.json({ message });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Database error: " + err.message });
    }
});

module.exports = router;
