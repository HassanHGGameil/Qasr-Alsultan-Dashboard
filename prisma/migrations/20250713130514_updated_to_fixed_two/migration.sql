/*
  Warnings:

  - You are about to alter the column `quantity` on the `OrderProductItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `totalPrice` on the `OrderProductItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `price` on the `ProductItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `quantity` on the `ProductItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "OrderProductItem" ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ProductItem" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
