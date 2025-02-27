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

// GET: /restaurants/search?name=name get by restaurant id
router.get("/search", (req, res) => {
    db.getRestaurantByName(req.query.page, req.query.perPage, req.query.name)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json({ "message": "Resource not found" + err })
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

// PUT: /restaurants/:id
router.put("/api/restaurants/:id", (req, res) => {
    db.updateRestaurantById(req.body, req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json({ "message": "Resource not found" + err });
        })
});

module.exports = router;
