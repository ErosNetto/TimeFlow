require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

const port = process.env.PORT;

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

// Routes
const router = require("./routers/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`App rodando a porta ${port}`);
});
