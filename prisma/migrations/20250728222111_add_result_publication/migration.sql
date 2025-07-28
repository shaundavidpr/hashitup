-- CreateTable
CREATE TABLE "result_publications" (
    "id" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedById" TEXT NOT NULL,
    "acceptedTeamsCount" INTEGER NOT NULL DEFAULT 0,
    "waitlistedTeamsCount" INTEGER NOT NULL DEFAULT 0,
    "rejectedTeamsCount" INTEGER NOT NULL DEFAULT 0,
    "totalNotifications" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "result_publications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "result_publications" ADD CONSTRAINT "result_publications_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
