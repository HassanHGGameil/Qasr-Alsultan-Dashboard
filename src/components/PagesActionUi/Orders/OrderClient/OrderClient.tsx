"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
// Components
import AlertModal from "@/components/Modals/alert-modal";
import Heading from "@/components/common/Heading/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

import OrderColumnType from "@/types/OrderColumnType";
import { DOMAIN } from "@/lib/constains/constains";
import Columns from "../Columns/Columns";

interface OrderClientProps {
  data: OrderColumnType[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<OrderColumnType[]>(data);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Calculate order statistics
  const { totalOrders, pendingOrders, completedOrders, paidOrders } =
    useMemo(() => {
      return {
        totalOrders: data.length,
        pendingOrders: data.filter((order) => order.status === "PENDING")
          .length,
        completedOrders: data.filter((order) => order.status === "DELIVERED")
          .length,
        paidOrders: data.filter((order) => order.isPaid).length,
      };
    }, [data]);

  const DeleteAll = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/orders`);
      router.refresh();
      router.push(`/orders`);
      toast.success("Orders Deleted.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        "Make sure you removed all Orders using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    setOrders(data);
    setLastUpdate(new Date());
  }, [data]);

  useEffect(() => {
    // Connect to Server-Sent Events for real-time order updates
    const eventSource = new EventSource("/api/socket/io");
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("Connected to SSE server");
      setIsConnected(true);
      toast.success("Connected to live order updates");
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "connected":
            console.log("Server confirmation:", data.message);
            break;

          case "newOrder":
            console.log("New order received:", data.data);
            setOrders((prev) => [data.data, ...prev]);
            setLastUpdate(new Date());
            toast.success(
              `New order received from ${data.data.name || data.data.phone}!`,
              {
                duration: 4000,
                icon: "🛍️",
              }
            );
            break;

          case "orderUpdate":
            console.log("Order updated:", data.data);
            setOrders((prev) =>
              prev.map((o) => (o.id === data.data.id ? data.data : o))
            );
            setLastUpdate(new Date());
            toast.success("Order updated!");
            break;

          case "orderDelete":
            console.log("Order deleted:", data.data.id);
            setOrders((prev) => prev.filter((o) => o.id !== data.data.id));
            setLastUpdate(new Date());
            toast.success("Order deleted!");
            break;

          case "ping":
            break;

          default:
            console.log("Unknown SSE message type:", data.type);
        }
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      setIsConnected(false);
      toast.error("Disconnected from live updates");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={DeleteAll}
        loading={loading}
      />

      <div className="flex items-center justify-between mb-6 ">
        <Heading
          title={`Orders (${totalOrders})`}
          description="Manage orders for your store"
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
              aria-label={isConnected ? "Connected" : "Disconnected"}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? "Live" : "Offline"}
            </span>
            {lastUpdate && (
              <span className="text-xs text-gray-500">
                Last update: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>

          <Button
            className="bg-red-600 text-white hover:bg-red-800"
            onClick={() => setOpen(true)}
            disabled={loading}
            aria-label="Delete all orders"
          >
            {loading ? "Deleting..." : "Delete All"}
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Order Management</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {pendingOrders} Pending
            </Badge>
            <Badge variant="outline" className="text-xs">
              {completedOrders} Completed
            </Badge>
            <Badge variant="outline" className="text-xs">
              {paidOrders} Paid
            </Badge>
          </div>
        </div>
        <DataTable columns={Columns} data={orders} searchKey="user" />
      </div>

      <Separator className="bg-slate-300 my-8" />
    </>
  );
};

export default OrderClient;
