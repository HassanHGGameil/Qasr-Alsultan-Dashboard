/*
  Warnings:

  - Made the column `phone` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zipCode` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "zipCode" SET NOT NULL;
