import { useCart } from "@/components/StoreActionUi/Cart/useCart"; 
import { Button } from "@/components/ui/button";
import TProduct from "@/types/frontendType/product";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useLocale } from "next-intl";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
  product: TProduct;
  maxQuantity?: number;
}

const TOAST_MESSAGES = {
  success: {
    en: (title: string, quantity: number) =>
      `${quantity} ${
        quantity === 1 ? "item" : "items"
      } of ${title} added to cart`,
    ar: (title: string, quantity: number) =>
      `تم إضافة ${quantity} ${
        quantity === 1 ? "منتج" : "منتجات"
      } من ${title} إلى السلة`,
  },
  error: {
    en: "Failed to add to cart",
    ar: "فشل الإضافة إلى السلة",
  },
  maxReached: {
    en: (max: number) => `Maximum quantity (${max}) reached`,
    ar: (max: number) => `الحد الأقصى (${max}) تم الوصول إليه`,
  },
};

const BUTTON_TEXTS = {
  maxReached: {
    en: "Max Reached",
    ar: "الحد الأقصى",
  },
  inCart: {
    en: (count: number) => `(${count})`,
    ar: (count: number) => `(${count})`,
  },
  default: {
    en: "",
    ar: "",
  },
  loading: {
    en: (count?: number) => ` ${count ? `(${count})` : ""}`,
    ar: (count?: number) => ` ${count ? `(${count})` : ""}`,
  },
};

const AddToCart = ({ product, maxQuantity = 10 }: AddToCartProps) => {
  const { addToCart, cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();

  const cartItem = useMemo(
    () => cartItems.find((item) => item.id === product.id),
    [cartItems, product.id]
  );

  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;
  const quantityReachedMax = isInCart && currentQuantity >= maxQuantity;

  const addToCartHandler = async () => {
    if (quantityReachedMax || isLoading) return;

    setIsLoading(true);

    try {
      const quantityToAdd = 1;
      // Add slight delay to ensure loader is visible
      await Promise.all([
        addToCart({
          id: product.id,
          titleEn: product.titleEn,
          titleAr: product.titleAr,
          images: product.images,
          price: product.price,
          productItems: product.productItems,
          quantity: quantityToAdd,
        }),
        new Promise((resolve) => setTimeout(resolve, 300)), // Minimum 300ms loader display
      ]);

      toast.success(
        TOAST_MESSAGES.success[locale as "en" | "ar"](
          locale === "en" ? product.titleEn : product.titleAr,
          quantityToAdd
        )
      );
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(TOAST_MESSAGES.error[locale as "en" | "ar"]);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (quantityReachedMax)
      return BUTTON_TEXTS.maxReached[locale as "en" | "ar"];
    if (isInCart)
      return BUTTON_TEXTS.inCart[locale as "en" | "ar"](currentQuantity);
    return BUTTON_TEXTS.default[locale as "en" | "ar"];
  };

  const getLoadingText = () => {
    return BUTTON_TEXTS.loading[locale as "en" | "ar"](
      isInCart ? currentQuantity : undefined
    );
  };

  const buttonClasses = cn(
    " transition-all duration-300",
    quantityReachedMax
      ? "bg-gray-400 hover:bg-gray-400 text-sm cursor-not-allowed"
      : "bg-red-700 dark:bg-yellow-500 text-sm text-white hover:bg-primary-dark",
    isLoading && "opacity-90"
  );

  return (
    <div className="w-full ">
      <Button
        variant="default"
        className={buttonClasses}
        onClick={addToCartHandler}
        disabled={isLoading || quantityReachedMax}
        aria-disabled={isLoading || quantityReachedMax}
        aria-label={BUTTON_TEXTS.default[locale as "en" | "ar"]}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <ReloadIcon className="h-4 w-4 animate-spin" />
            {getLoadingText()}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-2 w-2 lg:h-4 lg:w-4 " />
            <span className="hidden lg:block">
              {locale === "en" ? "Add" : "العربه"}
            </span>
            <span className="hidden lg:block">
            {getButtonText()}
            </span>
          </div>
        )}
      </Button>

      {quantityReachedMax && (
        <p className="text-[10px] text-destructive mt-1 animate-pulse">
          {TOAST_MESSAGES.maxReached[locale as "en" | "ar"](maxQuantity)}
        </p>
      )}
    </div>
  );
};

export default AddToCart;
