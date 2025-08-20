/*
  Warnings:

  - The values [PAYPAL] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paymentResult` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `OrderProductItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH_ON_DELIVERY', 'WHATSUP', 'STRIPE', 'PAYMOB');
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "OrderProductItem" DROP CONSTRAINT "OrderProductItem_orderItemId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentResult";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "totalPrice" INTEGER;

-- DropTable
DROP TABLE "OrderProductItem";
