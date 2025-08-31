"use client";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import AlertModal from "@/components/Modals/alert-modal";
import Heading from "@/components/common/Heading/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Play, Pause, CheckCircle, Clock, DollarSign } from "lucide-react";

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

  // ✅ Restore liveEnabled directly from localStorage (no flicker on reload)
  const [liveEnabled, setLiveEnabled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("liveEnabled") === "true";
    }
    return false;
  });

  const [isHydrated, setIsHydrated] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Mark hydrated (prevents SSR mismatch)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Persist liveEnabled to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("liveEnabled", String(liveEnabled));
    }
  }, [liveEnabled, isHydrated]);

  const { totalOrders, pendingOrders, completedOrders, paidOrders } =
    useMemo(() => {
      return {
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "PENDING").length,
        completedOrders: orders.filter((o) => o.status === "DELIVERED").length,
        paidOrders: orders.filter((o) => o.isPaid).length,
      };
    }, [orders]);

  const DeleteAll = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/orders`);
      setOrders([]);
      setLastUpdate(new Date().toLocaleTimeString());
      router.refresh();
      toast.success("Orders Deleted.");
    } catch {
      toast.error("Error deleting orders");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // SSE connect
  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) return;
    const eventSource = new EventSource(`${DOMAIN}/api/socket/io`);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
      toast.success("Live updates connected", { id: "sse-status" });
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "newOrder":
            setOrders((prev) => [data.data, ...prev]);
            break;
          case "orderUpdate":
            setOrders((prev) =>
              prev.map((o) => (o.id === data.data.id ? data.data : o))
            );
            break;
          case "orderDelete":
            setOrders((prev) => prev.filter((o) => o.id !== data.data.id));
            break;
        }
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      toast.error("Live updates disconnected", { id: "sse-status" });
      eventSource.close();
      eventSourceRef.current = null;

      if (liveEnabled) {
        setTimeout(() => connectSSE(), 3000);
      }
    };
  }, [liveEnabled]);

  const disconnectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
      toast("⏸️ Live updates stopped", { id: "sse-status" });
    }
  }, []);

  // Start/stop based on liveEnabled
  useEffect(() => {
    if (!isHydrated) return;
    if (liveEnabled) connectSSE();
    else disconnectSSE();
  }, [liveEnabled, connectSSE, disconnectSSE, isHydrated]);

  // ⛔ Don’t render UI until hydrated

  if (!isHydrated) return null;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={DeleteAll}
        loading={loading}
      />

      <div className="flex items-center justify-between mb-6">
        <Heading
          title={`Orders (${totalOrders})`}
          description="Manage orders for your store"
        />

        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
              isConnected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {isConnected ? "Live Updates On" : "Live Updates Off"}
          </div>

          {lastUpdate && (
            <span className="text-xs text-gray-500 italic">⏱ {lastUpdate}</span>
          )}

          <Button
            onClick={() => setLiveEnabled((prev) => !prev)}
            className={`flex items-center gap-2 rounded-xl shadow px-4 ${
              liveEnabled
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {liveEnabled ? <Pause size={16} /> : <Play size={16} />}
            {liveEnabled ? "Stop Live" : "Start Live"}
          </Button>

          {/* <Button className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 rounded-xl shadow" onClick={() => setOpen(true)} disabled={loading}>
            <Trash size={16} />
            {loading ? "Deleting..." : "Delete All"}
          </Button> */}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="p-2 rounded-2xl shadow-sm bg-white border flex flex-col items-center space-y-3">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-3xl font-extrabold text-yellow-600">
            {pendingOrders}
          </span>
          <span className="text-sm text-gray-600">Pending Orders</span>
        </div>

        <div className="p-2 rounded-2xl shadow-sm bg-white border flex flex-col items-center space-y-3">
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-3xl font-extrabold text-green-600">
            {completedOrders}
          </span>
          <span className="text-sm text-gray-600">Completed Orders</span>
        </div>

        <div className="p-2 rounded-2xl shadow-sm bg-white border flex flex-col items-center space-y-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-3xl font-extrabold text-blue-600">
            {paidOrders}
          </span>
          <span className="text-sm text-gray-600">Paid Orders</span>
        </div>
      </div>

      <div className="mb-6">
        <DataTable columns={Columns} data={orders} searchKey="user" />
      </div>

      <Separator className="bg-slate-300 my-8" />
    </>
  );
};

export default OrderClient;
