-- CreateTable
CREATE TABLE "Individual" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "birthdate" TIMESTAMP(3),
    "fatherID" TEXT,
    "motherID" TEXT,
    "partnersID" TEXT[],
    "profile" TEXT,

    CONSTRAINT "Individual_pkey" PRIMARY KEY ("id")
);
