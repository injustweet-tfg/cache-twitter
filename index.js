const express = require('express');
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./.env" });

// Settings
const port = process.env.PORT || 5000;
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Midedlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(require('./routes/tweets'));

// connect to MongoDB
const dbo = require("./db/conn"); 

// Server who listens to requests and uses a client of
// MongoDB to fulfill them
app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
}
);