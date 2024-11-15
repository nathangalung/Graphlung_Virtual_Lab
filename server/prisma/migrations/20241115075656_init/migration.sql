-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRecords" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "easyComplete" INTEGER NOT NULL DEFAULT 0,
    "mediumComplete" INTEGER NOT NULL DEFAULT 0,
    "hardComplete" INTEGER NOT NULL DEFAULT 0,
    "easyHighScore" INTEGER NOT NULL DEFAULT 0,
    "mediumHighScore" INTEGER NOT NULL DEFAULT 0,
    "hardHighScore" INTEGER NOT NULL DEFAULT 0,
    "easyBestTime" INTEGER,
    "mediumBestTime" INTEGER,
    "hardBestTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GameRecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "GameRecords_userId_key" ON "GameRecords"("userId");

-- AddForeignKey
ALTER TABLE "GameRecords" ADD CONSTRAINT "GameRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;