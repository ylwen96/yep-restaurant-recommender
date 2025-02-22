require("dotenv").config();

const express = require("express");
const stoppable = require("stoppable");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/restaurants", require("./controller"));

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

stoppable(
    app.listen(port, () => {
        console.log("listening on port ", port, ", url : http://localhost:8080");
    })
);
