"use strict";
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config();
app.use([
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(),
]);
app.get('/', (req, res) => {
    res.json({
        message: 'Good',
    });
});
module.exports = app;
