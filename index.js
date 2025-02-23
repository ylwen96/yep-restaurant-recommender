const express = require("express");
const cors = require("cors");
const app = express();
const { version, author } = require("./package.json");
const db = require("./model/restaurantDB")

app.use(cors());

app.use("/restaurants", require("./controller"));

app.get("/", (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.status(200).json({
        status: "ok",
        author,
        githubUrl: "https://github.com/ylwen96/yep-restaurant-recommender",
        version,
    });
});


app.use((req, res) => {
    res.status(404).json({
        status: "error",
        error: {
            message: "route not found",
            code: 404,
        },
    });
});

const port = parseInt(process.env.PORT || 8080, 10);


db.initialize().then(() => {
    app.listen(port, () => {
        console.log("listening on port ", port, ", url : http://localhost:8080");
    });
}).catch((err) => {
    console.log(err);
});
