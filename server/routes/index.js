const { Router } = require("express");
const db = require("../models/queries");

const router = Router();

router.post("/check-coordinates", async (req, res) => {
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

router.get("/scoreboard", async (req, res) => {
  try {
    const scores = await db.getScoreboard();
    console.log(scores);
    if (scores) {
      res.status(200).json(scores);
    }
  } catch (err) {
    console.error("Error fetching scoreboard.");
    res.status(500).json({ message: "Error fetching scoreboard!!!" });
  }
});

router.post("/scoreboard", async (req, res) => {
  const { initials, time } = req.body;

  try {
    const response = await db.postToScoreboard(initials, time);
    if (response) {
      res.status(200).json({ message: "Posting successful!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting to Scoreboard." });
  }
});

module.exports = router;
