/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "city" TEXT DEFAULT '',
ADD COLUMN     "name" TEXT DEFAULT '',
ADD COLUMN     "zipCode" TEXT DEFAULT '',
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- DropTable
DROP TABLE "Notification";

-- DropEnum
DROP TYPE "NotificationType";
