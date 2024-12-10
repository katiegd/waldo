const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes/index.js");
const db = require("./models/queries.js");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

async function initiateDb() {
  try {
    await db.populateWinners();
    console.log("Winners populated!");
  } catch (err) {
    console.error(err);
  }
}

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: "GET, POST",
};

// Set up form capture, JSON, and static path to serve React frontend
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/", router);

// To serve React front end
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server IIFE
(async function startServer() {
  try {
    await initiateDb();
    app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server.", err);
    process.exit(1);
  }
})();
