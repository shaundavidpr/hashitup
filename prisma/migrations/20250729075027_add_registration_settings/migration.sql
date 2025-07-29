-- CreateTable
CREATE TABLE "registration_settings" (
    "id" TEXT NOT NULL,
    "registrationEndDate" TIMESTAMP(3),
    "isRegistrationOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_settings_pkey" PRIMARY KEY ("id")
);
