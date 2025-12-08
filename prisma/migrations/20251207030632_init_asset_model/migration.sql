-- CreateTable
CREATE TABLE "public"."assets" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initial_price" DOUBLE PRECISION NOT NULL,
    "drift" DOUBLE PRECISION NOT NULL,
    "volatility" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assets_ticker_key" ON "public"."assets"("ticker");
