const { clerkMiddleware } = require('@clerk/express');
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const helmet = require('helmet')
const app = express();

app.use(morgan('dev'))
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(clerkMiddleware());
app.use(helmet())

const user = require("./routes/userRoute");

app.use('/user/api', user)


module.exports = app
