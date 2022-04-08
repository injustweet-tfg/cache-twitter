// Server

const express = require('express');
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./.env" });

// Settings
const port = process.env.CACHE_PORT || 5000;

// Midedlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(require('./routes/tweets'));
const dbo = require("./db/conn"); // connect MongoDB


app.listen(port, () => {
    dbo.connectToServer(function (err) { 
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
}
);