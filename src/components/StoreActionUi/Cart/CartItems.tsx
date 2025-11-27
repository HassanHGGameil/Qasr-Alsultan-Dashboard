"use client";
import { Minus, Plus, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "./useCart";
import { CartItem } from "@/redux/features/cart/cartSlice";
import { formater } from "@/lib/utils/utils"; 
import { MdDelete } from "react-icons/md";
import { useLocale } from "next-intl";

export default function CartItems() {
  const { cartItems, removeFromCart, updateCartQuantity } = useCart();

  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const locale = useLocale();

  const handleRemove = async (id: string) => {
    setIsRemoving(id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    removeFromCart(id);
    setIsRemoving(null);
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    setIsUpdating(id);
    await new Promise((resolve) => setTimeout(resolve, 200));
    // ✅ enforce 1–10 range
    updateCartQuantity(id, Math.max(1, Math.min(9, quantity)));
    setIsUpdating(null);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Card className="bg-slate-100 dark:bg-slate-900">
      <CardHeader className="flex flex-row justify-center gap-5 items-center bg-red-900">
        {/* <h2 className="text-xl font-semibold">Your Items</h2> */}
        {/* <Badge variant="outline">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Badge> */}
        <div className="text-white font-semibold">
          <h2 className="">
            {locale === "en" ? "Your Addtions" : "الاضفات الخاصه بك"}
          </h2>
        </div>
      </CardHeader>

      <CardContent className=" p-0 ">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 p-6 text-center text-muted-foreground">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <span className="">
              {locale === "en" ? "Your cart is empty" : "العربه فارغه"}
            </span>
          </div>
        ) : (
          <AnimatePresence>
            {cartItems.map((item: CartItem) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="flex items-start gap-4 p-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.images?.[0]?.url || "/placeholder-product.jpg"}
                    alt={item.titleEn}
                    fill
                    className="object-cover"
                    sizes="64px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-product.jpg";
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-medium line-clamp-2">
                      {locale === "en" ? item.titleEn : item.titleAr}
                    </h3>

                    <Button
                      aria-label="Remove item"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(item.id)}
                      disabled={isRemoving === item.id}
                      className="h-8 w-8 bg-white hover:bg-red-800 shadow-sm"
                    >
                      {isRemoving === item.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <MdDelete className="h-3 w-3 text-slate-900" />
                      )}
                    </Button>
                  </div>

                  <p className="text-sm font-semibold text-red-800 ">
                    {formater.format(item.price * item.quantity)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      aria-label="Decrease quantity"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1 || isUpdating === item.id}
                      className="h-7 w-7 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <div className="relative">
                      <Input
                        type="number"
                        min="1"
                        max="10" // ✅ restrict input max
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-12 h-7 text-center text-sm"
                        disabled={isUpdating === item.id}
                      />
                      {isUpdating === item.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                          <Loader2 className="h-3 w-3 animate-spin" />
                        </div>
                      )}
                    </div>

                    <Button
                      aria-label="Increase quantity"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={isUpdating === item.id || item.quantity >= 9} // ✅ disable at 10
                      className="h-7 w-7 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </CardContent>

      {cartItems.length > 0 && (
        <CardFooter className="flex flex-col gap-3 pt-4">
          <div className="flex justify-between w-full font-semibold">
            <span>{locale === "en" ? "Subtotal: " : "المجموع الجذئي :"}</span>
            <span>{formater.format(subtotal)}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
