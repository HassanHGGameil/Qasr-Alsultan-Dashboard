"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@/i18n/routing";
import { formatCurrency } from "@/lib/formatters";
import { OrderStatus, DeliveryStatus } from "@prisma/client";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface ProductItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface OrderDetailsProps {
  order: {
    id: string;
    user?: UserInfo;
    name: string;
    branch: string;
    phone: string;
    address: string;
    isPaid: boolean;
    totalPrice: number;
    status: OrderStatus;
    deliveryStatus?: DeliveryStatus | null;
    paymentMethod?: string | null;
    products: ProductItem[];
    createdAt: string;
    updatedAt: string;
  };
}

const statusColors = {
  [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-800",
  [OrderStatus.SHIPPED]: "bg-indigo-100 text-indigo-800",
  [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
  [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
  [OrderStatus.RETURNED]: "bg-purple-100 text-purple-800",
} as const;

const deliveryStatusColors = {
  [DeliveryStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [DeliveryStatus.IN_TRANSIT]: "bg-blue-100 text-blue-800",
  [DeliveryStatus.DELIVERED]: "bg-green-100 text-green-800",
  [DeliveryStatus.FAILED]: "bg-red-100 text-red-800",
} as const;

const PLACEHOLDER_IMAGE = "/placeholder-product.jpg";

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [currentDeliveryStatus, setCurrentDeliveryStatus] = useState<
    DeliveryStatus | undefined
  >(order.deliveryStatus || undefined);

  const formattedDate = useMemo(
    () => format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a"),
    [order.createdAt]
  );

  const handleStatusUpdate = useCallback(
    async (
      type: "order" | "delivery",
      newStatus: OrderStatus | DeliveryStatus
    ) => {
      try {
        setLoading(true);

        // Validate status transitions
        if (type === "delivery" && !order.isPaid) {
          throw new Error("Cannot update delivery status for unpaid orders");
        }

        const response = await fetch(`/api/orders/${order.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [type === "order" ? "status" : "deliveryStatus"]: newStatus,
          }),
        });

          router.push(`/orders`);


        if (!response.ok) {
          const errorData = await response.json();

          throw new Error(
            errorData.message || `Failed to update ${type} status`
          );
        }

        if (type === "order") {
          setCurrentStatus(newStatus as OrderStatus);
        } else {
          setCurrentDeliveryStatus(newStatus as DeliveryStatus);
        }

        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} status updated`
        );
        router.refresh();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to update ${type} status`;
        toast.error(errorMessage);
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [order.id, order.isPaid, router]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Order Details</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Order Summary Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <span className="text-blue-600">Order Id</span>
              <span className="">{order.id}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p>{formattedDate}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Method
                  </p>
                  <p>{order.paymentMethod || "Not specified"}</p>
                  <div className="flex items-center gap-4">
                  <span className="">Branch :-</span>
                  <h2 className="text-sm text-muted-foreground">
                    {order.branch ? order.branch : "Not Branch"}
                  </h2>
                </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Products</h3>
                <div className="mt-2 space-y-4">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={product.image || PLACEHOLDER_IMAGE}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                          priority={false}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.quantity} * {formatCurrency(product.price)}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(product.price * product.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <p className="font-medium">Total</p>
                <p className="font-bold">{formatCurrency(order.totalPrice)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer and Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Customer & Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium">Customer Information</h3>
              <div className="mt-2 space-y-2">
                <p>{order.user?.name || order.name}</p>
                <p className="text-sm text-muted-foreground">
                  {order.user?.email || "No email provided"}
                </p>
                <p className="text-sm text-muted-foreground">{order.name}</p>
                <p className="text-sm text-muted-foreground">{order.phone}</p>
                <p className="text-sm text-muted-foreground">{order.address}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium">Order Status</h3>
              <div className="mt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <p>Payment Status</p>
                  <Badge variant={order.isPaid ? "default" : "destructive"}>
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <p>Order Status</p>
                  <Select
                    value={currentStatus}
                    onValueChange={(value: OrderStatus) =>
                      handleStatusUpdate("order", value)
                    }
                    disabled={loading}
                  >
                    <SelectTrigger className="w-[150px]">
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <SelectValue>
                          <Badge className={statusColors[currentStatus]}>
                            {currentStatus}
                          </Badge>
                        </SelectValue>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(OrderStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          <Badge className={statusColors[status]}>
                            {status}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {order.isPaid && (
                  <div className="flex items-center justify-between">
                    <p>Delivery Status</p>
                    <Select
                      value={currentDeliveryStatus}
                      onValueChange={(value: DeliveryStatus) =>
                        handleStatusUpdate("delivery", value)
                      }
                      disabled={loading}
                    >
                      <SelectTrigger className="w-[150px]">
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : currentDeliveryStatus ? (
                          <SelectValue>
                            <Badge
                              className={
                                deliveryStatusColors[currentDeliveryStatus]
                              }
                            >
                              {currentDeliveryStatus}
                            </Badge>
                          </SelectValue>
                        ) : (
                          <SelectValue placeholder="Select status" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DeliveryStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            <Badge className={deliveryStatusColors[status]}>
                              {status}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};