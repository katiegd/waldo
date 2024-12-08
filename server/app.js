const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models/queries");

require("dotenv").config();

const app = express();
async function initiateDb() {
  await db.populateWinners();
}

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST",
};

// Set up form capture, JSON, and static path to serve React frontend
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.send("You did it!");
});

app.post("/check-coordinates", async (req, res) => {
  const { x, y, name } = req.body;

  try {
    const coordMatch = await db.checkCoordinates(x, y, name);
    if (coordMatch) {
      res
        .status(200)
        .json({ coordMatch, message: `You found ${coordMatch.name}` });
    } else {
      res.status(200).json({ message: `Nope. Keep looking!` });
    }
  } catch (err) {
    console.error("Error checking coordinates.", err);
    res.status(500).json({ message: "An error occurred.", err });
  }
});

PORT = process.env.PORT || 3000;

initiateDb();

app.listen(PORT, () => console.log(`App listenening at port ${PORT}`));
