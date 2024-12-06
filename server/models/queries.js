const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Populate winning coordinates and characters
async function populateWinners() {
  console.log("Seeding...");
  const existingData = await prisma.winners.findMany({
    where: {
      name: { in: ["Nibbler", "Scruffy", "DaVinci"] },
    },
  });

  if (existingData.length === 0) {
    await prisma.winners.createMany({
      data: [
        { name: "Nibbler", xMin: 2110, xMax: 2150, yMin: 640, yMax: 700 },
        { name: "Scruffy", xMin: 630, xMax: 680, yMin: 2350, yMax: 2420 },
        { name: "DaVinci", xMin: 780, xMax: 850, yMin: 1790, yMax: 1850 },
      ],
    });
    console.log("Data populated!");
  } else {
    console.log("Data already exists.");
  }
}

async function checkCoordinates(x, y, char) {
  return await prisma.winners.findFirst({
    where: {
      xMin: { lte: x },
      xMax: { gte: x },
      yMin: { lte: x },
      yMax: { gte: y },
      name: char,
    },
  });
}

module.exports = {
  populateWinners,
  checkCoordinates,
};
