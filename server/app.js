const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes/index.js");
const db = require("./models/queries.js");

require("dotenv").config();

const app = express();

// async function initiateDb() {
//   try {
//     await db.populateWinners();
//   } catch (err) {
//     console.error(err);
//   }
// }

const corsOptions = {
  origin: ["https://waldo-zfkw.onrender.com"],
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

PORT = process.env.PORT || 3000;

// initiateDb();

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
