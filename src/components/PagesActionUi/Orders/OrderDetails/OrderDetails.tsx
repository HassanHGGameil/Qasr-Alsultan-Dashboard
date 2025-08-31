"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { formater } from "@/lib/utils/utils";
import { OrderStatus, DeliveryStatus } from "@prisma/client";
import { format } from "date-fns";
import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  ArrowLeft,
  CreditCard,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";
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
  [OrderStatus.PENDING]: "bg-amber-100 text-amber-800 border-amber-200",
  [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-800 border-blue-200",
  [OrderStatus.SHIPPED]: "bg-indigo-100 text-indigo-800 border-indigo-200",
  [OrderStatus.DELIVERED]: "bg-emerald-100 text-emerald-800 border-emerald-200",
  [OrderStatus.CANCELLED]: "bg-rose-100 text-rose-800 border-rose-200",
  [OrderStatus.RETURNED]: "bg-violet-100 text-violet-800 border-violet-200",
} as const;

const deliveryStatusColors = {
  [DeliveryStatus.PENDING]: "bg-amber-100 text-amber-800 border-amber-200",
  [DeliveryStatus.IN_TRANSIT]: "bg-blue-100 text-blue-800 border-blue-200",
  [DeliveryStatus.DELIVERED]: "bg-emerald-100 text-emerald-800 border-emerald-200",
  [DeliveryStatus.FAILED]: "bg-rose-100 text-rose-800 border-rose-200",
} as const;

const paymentStatusColors = {
  true: "bg-emerald-100 text-emerald-800 border-emerald-200",
  false: "bg-rose-100 text-rose-800 border-rose-200",
} as const;

const PLACEHOLDER_IMAGE = "/placeholder-product.jpg";

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [currentDeliveryStatus, setCurrentDeliveryStatus] = useState<
    DeliveryStatus | undefined
  >(order.deliveryStatus || undefined);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState<boolean>(
    order.isPaid
  );

  const formattedDate = useMemo(
    () => format(new Date(order.createdAt), "MMM dd, yyyy 'at' hh:mm a"),
    [order.createdAt]
  );

  const handleStatusUpdate = useCallback(
    async (
      type: "order" | "delivery" | "payment",
      newStatus: OrderStatus | DeliveryStatus | boolean
    ) => {
      try {
        setLoading(true);

        if (type === "delivery" && !order.isPaid) {
          throw new Error("Cannot update delivery status for unpaid orders");
        }

        const response = await fetch(`/api/orders/${order.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [type === "order"
              ? "status"
              : type === "delivery"
              ? "deliveryStatus"
              : "isPaid"]: newStatus,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Failed to update ${type} status`
          );
        }

        if (type === "order") {
          setCurrentStatus(newStatus as OrderStatus);
        } else if (type === "delivery") {
          setCurrentDeliveryStatus(newStatus as DeliveryStatus);
        } else {
          setCurrentPaymentStatus(newStatus as boolean);
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
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Order Details
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track order #{order.id.slice(-8)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <Card className="overflow-hidden border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">Order Summary</span>
                  <Badge variant="outline" className="font-normal">
                    {formattedDate}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CreditCard className="h-4 w-4" />
                        <span>Payment Method</span>
                      </div>
                      <p className="font-medium">
                        {order.paymentMethod || "Not specified"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>Branch</span>
                      </div>
                      <p className="font-medium">
                        {order.branch || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-500" />
                      Products ({order.products.length})
                    </h3>
                    <div className="space-y-4">
                      {order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-3 rounded-lg border bg-white"
                        >
                          <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0 border">
                            <Image
                              src={product.image || PLACEHOLDER_IMAGE}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              priority={false}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {product.quantity} ×{" "}
                              {formater.format(product.price)}
                            </p>
                          </div>
                          <p className="font-medium whitespace-nowrap">
                            {formater.format(product.quantity * product.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-lg">Total Amount</p>
                    <p className="font-bold text-lg text-blue-600">
                      {formater.format(order.totalPrice)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Customer and Status */}
          <div className="space-y-6">
            {/* Customer Information Card */}
            <Card className="overflow-hidden border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {order.user?.name || order.name || "No name provided"}
                    </p>
                    <p className="text-sm text-gray-500">Customer Name</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {order.user?.email || "No email provided"}
                    </p>
                    <p className="text-sm text-gray-500">Email Address</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {order.phone || "No phone provided"}
                    </p>
                    <p className="text-sm text-gray-500">Phone Number</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {order.address || "From Branch"}
                    </p>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Card */}
            <Card className="overflow-hidden border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-4">
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  {/* Payment Status Select */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">Payment Status</span>
                    </div>
                    <Select
                      value={currentPaymentStatus ? "true" : "false"}
                      onValueChange={(value) =>
                        handleStatusUpdate("payment", value === "true")
                      }
                      disabled={loading}
                    >
                      <SelectTrigger className="w-40">
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <SelectValue>
                            <Badge
                              className={`${
                                paymentStatusColors[
                                  currentPaymentStatus.toString() as
                                    | "true"
                                    | "false"
                                ]
                              } px-2 py-1`}
                            >
                              {currentPaymentStatus ? "Paid" : "Unpaid"}
                            </Badge>
                          </SelectValue>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">
                          <Badge className={paymentStatusColors["true"]}>
                            Paid
                          </Badge>
                        </SelectItem>
                        <SelectItem value="false">
                          <Badge className={paymentStatusColors["false"]}>
                            Unpaid
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Order Status Select */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">Order Status</span>
                    </div>
                    <Select
                      value={currentStatus}
                      onValueChange={(value: OrderStatus) =>
                        handleStatusUpdate("order", value)
                      }
                      disabled={loading}
                    >
                      <SelectTrigger className="w-40">
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <SelectValue>
                            <Badge
                              className={`${statusColors[currentStatus]} px-2 py-1`}
                            >
                              {currentStatus.replace("_", " ")}
                            </Badge>
                          </SelectValue>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(OrderStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            <Badge className={statusColors[status]}>
                              {status.replace("_", " ")}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {order.isPaid && (
                    <>
                      <Separator />
                      {/* Delivery Status Select */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-gray-400" />
                          <span className="text-sm">Delivery Status</span>
                        </div>
                        <Select
                          value={currentDeliveryStatus}
                          onValueChange={(value: DeliveryStatus) =>
                            handleStatusUpdate("delivery", value)
                          }
                          disabled={loading || !order.isPaid}
                        >
                          <SelectTrigger className="w-40">
                            {loading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : currentDeliveryStatus ? (
                              <SelectValue>
                                <Badge
                                  className={`${
                                    deliveryStatusColors[currentDeliveryStatus]
                                  } px-2 py-1`}
                                >
                                  {currentDeliveryStatus.replace("_", " ")}
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
                                  {status.replace("_", " ")}
                                </Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => router.refresh()}
                  variant="outline"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Refresh Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
