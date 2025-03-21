-- CreateTable
CREATE TABLE "QrCode" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_domain_key" ON "QrCode"("domain");
