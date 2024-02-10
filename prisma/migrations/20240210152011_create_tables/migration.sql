-- CreateTable
CREATE TABLE "Individual" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "gender" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "deathDate" TIMESTAMP(3),
    "birthPlace" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Individual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" TEXT NOT NULL,
    "individual1Id" TEXT NOT NULL,
    "individual2Id" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalDetail" (
    "id" TEXT NOT NULL,
    "individualId" TEXT NOT NULL,
    "detailType" TEXT NOT NULL,
    "detailValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdditionalDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_individual1Id_fkey" FOREIGN KEY ("individual1Id") REFERENCES "Individual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_individual2Id_fkey" FOREIGN KEY ("individual2Id") REFERENCES "Individual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalDetail" ADD CONSTRAINT "AdditionalDetail_individualId_fkey" FOREIGN KEY ("individualId") REFERENCES "Individual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
