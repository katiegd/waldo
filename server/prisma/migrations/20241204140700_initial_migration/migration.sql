-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "xMin" INTEGER NOT NULL,
    "xMax" INTEGER NOT NULL,
    "yMin" INTEGER NOT NULL,
    "yMax" INTEGER NOT NULL,

    CONSTRAINT "Winners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);
