type OrderColumnType = {
  id: string;
  name: string; // Non-nullable with default "" in Prisma
  phone: string; // Non-nullable with default "" in Prisma
  address: string; // Non-nullable with default "" in Prisma
  city: string; // Non-nullable with default "" in Prisma
  zipCode: string; // Non-nullable with default "" in Prisma
  branch: string; // Non-nullable with default "" in Prisma
  isPaid: boolean;
  totalPrice: number; // Changed from string to number (since Prisma uses Int)
  status: string;
  deliveryStatus: string;
  paymentMethod: string;
  products: string; // This would come from orderItem relation
  createdAt: string; // DateTime in Prisma, string when serialized
};

export default OrderColumnType;
