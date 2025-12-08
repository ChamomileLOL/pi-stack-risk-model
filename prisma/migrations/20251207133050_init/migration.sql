/*
  Warnings:

  - You are about to drop the `assets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "assets";

-- CreateTable
CREATE TABLE "AggregatedTick" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "totalVolume" INTEGER NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AggregatedTick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskModelResult" (
    "id" SERIAL NOT NULL,
    "portfolio" VARCHAR(50) NOT NULL,
    "valueAtRisk" DOUBLE PRECISION NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskModelResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AggregatedTick_startTime_key" ON "AggregatedTick"("startTime");
