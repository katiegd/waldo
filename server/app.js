const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();

// Set up form capture, JSON, and static path to serve React frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.send("You did it!");
});

PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listenening at port ${PORT}`));
