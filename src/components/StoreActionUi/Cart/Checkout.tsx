"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "./useCart";
import { Loader2, Truck, Building } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { STORE } from "@/lib/constains/constains";
import { useLocale } from "next-intl";
import { Locale, useRouter } from "@/i18n/routing";
import axios from "axios";
import { toast } from "react-hot-toast";
import { axiosErrorHandler } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getBranches from "@/lib/Actions/FrontendAction/getBranches";
import { BranchesDto } from "@/types/frontendType/branches"; 
import { formater } from "@/lib/utils/utils"; 

const translations = {
  en: {
    checkout: "Checkout",
    personalInfo: "Personal Information",
    contactInfo: "Contact Information",
    shippingAddress: "Shipping Address",
    paymentMethod: "Payment Method",
    orderSummary: "Order Summary",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    address: "Address",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    placeOrder: "Place Order",
    clearCart: "Clear Cart",
    processing: "Processing...",
    payment_at_branch: "Payment at Branch",
    branchPaymentDescription:
      "You'll pay at the branch when you pick up your order",
    cash_on_delivery: "Cash on Delivery",
    codDescription: "You'll pay in cash when your order is delivered",
    free: "Free",
    nameError: "Name must be at least 2 characters",
    phoneError: "Invalid phone number",
    addressError: "Address must be at least 5 characters",
    paymentError: "Please select a payment method",
    orderSubmitted: "Order submitted successfully",
    orderError: "Failed to create order",
    paymentUrlError: "Payment URL not received",
    checkoutFailed: "Checkout failed",
    selectBranch: "Select branch",
    branch: "Branch",
    delivery: "Delivery",
    branchError: "Please select a branch",
  },
  ar: {
    checkout: "طريقه الدفع",
    personalInfo: "المعلومات الشخصية",
    contactInfo: "معلومات الاتصال",
    shippingAddress: "عنوان الشحن",
    paymentMethod: "طريقة الدفع",
    orderSummary: "ملخص الطلب",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    address: "العنوان",
    subtotal: "المجموع الجزئي",
    shipping: "الشحن",
    total: "المجموع الكلي",
    placeOrder: "تأكيد الطلب",
    clearCart: "تفريغ السلة",
    processing: "جاري المعالجة...",
    payment_at_branch: "الدفع في الفرع",
    branchPaymentDescription: "سوف تدفع في الفرع عند استلام طلبك",
    cash_on_delivery: "الدفع عند الاستلام",
    codDescription: "سوف تدفع نقداً عند استلام طلبك",
    free: "مجاني",
    nameError: "يجب أن يكون الاسم مكون من حرفين على الأقل",
    phoneError: "رقم هاتف غير صالح",
    addressError: "يجب أن يكون العنوان مكون من 5 أحرف على الأقل",
    paymentError: "الرجاء اختيار طريقة الدفع",
    orderSubmitted: "تم تقديم الطلب بنجاح",
    orderError: "فشل إنشاء الطلب",
    paymentUrlError: "لم يتم استلام رابط الدفع",
    checkoutFailed: "فشل عملية الدفع",
    selectBranch: "اختر الفرع",
    branch: "الفرع",
    delivery: "توصيل",
    branchError: "الرجاء اختيار فرع",
  },
};

const paymentMethods = ["CASH_ON_DELIVERY", "PAYMENT_AT_BRANCH"] as const;
type PaymentMethod = (typeof paymentMethods)[number];

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const { cartItems, clearCartItems: removeAll } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [branches, setBranches] = useState<BranchesDto[]>([]);

  const locale = useLocale() as Locale;
  const t = translations[locale];
  const isRTL = locale === "ar";

  // Fetch branches on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesData = await getBranches();
        setBranches(branchesData);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const formSchema = z
    .object({
      name: z.string().min(2, t.nameError),
      phone: z
        .string()
        .min(6, t.phoneError)
        .regex(/^[0-9+\-() ]+$/, t.phoneError),
      address: z.string().min(5, t.addressError).optional().or(z.literal("")),
      paymentMethod: z.enum(paymentMethods, {
        required_error: t.paymentError,
      }),
      branchId: z.string().min(1, t.branchError).optional().or(z.literal("")),
    })
    .superRefine((data, ctx) => {
      if (data.paymentMethod === "CASH_ON_DELIVERY" && !data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t.addressError,
          path: ["address"],
        });
      }
      if (data.paymentMethod === "PAYMENT_AT_BRANCH" && !data.branchId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t.branchError,
          path: ["branchId"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      paymentMethod: undefined,
      branchId: "",
    },
  });

  // Get the selected payment method from form
  const selectedPayment = form.watch("paymentMethod");

  useEffect(() => {
    if (showSuccess) return;

    if (searchParamsStr.includes("success")) {
      setShowSuccess(true);
      toast.success("✅ Payment Completed.");
      removeAll();
    }

    if (searchParamsStr.includes("canceled")) {
      toast.error("❌ Payment Canceled.");
    }
  }, [searchParamsStr, showSuccess, removeAll]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      try {
        const itemPrice = parseFloat(String(item.price)) || 0;
        const quantity = item.quantity || 1;
        return total + itemPrice * quantity;
      } catch (error) {
        console.error("Error calculating price for item:", item.id, error);
        return total;
      }
    }, 0);
  }, [cartItems]);

  const handlePaymentSelect = (method: PaymentMethod) => {
    form.setValue("paymentMethod", method);

    // Clear the other field when switching payment methods
    if (method === "CASH_ON_DELIVERY") {
      form.setValue("branchId", "");
      form.clearErrors("branchId");
    } else {
      form.setValue("address", "");
      form.clearErrors("address");
    }
  };

  const handleCheckout = async (
    paymentMethod: PaymentMethod,
    formData: z.infer<typeof formSchema>
  ) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      // Find the selected branch
      const selectedBranch = formData.branchId
        ? branches.find((branch) => branch.id === formData.branchId)
        : null;

      const orderData = {
        items: cartItems,
        customer: {
          name: formData.name,
          phone: formData.phone,
          ...(formData.paymentMethod === "CASH_ON_DELIVERY"
            ? { address: formData.address }
            : {
                branchId: formData.branchId,
                branch: selectedBranch
                  ? locale === "ar"
                    ? selectedBranch.nameAr
                    : selectedBranch.nameEn
                  : "",
              }),
        },
        paymentMethod,
        totalPrice,
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(`${STORE}/api/orders`, orderData, {
        headers: { "Content-Type": "application/json" },
      });

      switch (paymentMethod) {
        case "CASH_ON_DELIVERY":
          toast.success(t.orderSubmitted);
          removeAll();
          router.push("/order/orderSuccess");
          break;
        case "PAYMENT_AT_BRANCH":
          toast.success(t.orderSubmitted);
          removeAll();
          router.push("/order/orderSuccess");
          break;
        default:
          throw new Error("Unsupported payment method");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setErrorMessage(t.checkoutFailed);
      toast.error(t.checkoutFailed);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.paymentMethod) {
      form.setError("paymentMethod", { message: t.paymentError });
      return;
    }

    try {
      await handleCheckout(values.paymentMethod, values);
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl dark:bg-slate-900" dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader className="bg-green-400 text-white mb-5 text-center">
        <CardTitle>{t.checkout}</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6">
            {errorMessage && (
              <div className="p-4 text-sm text-destructive bg-destructive/15 rounded-md">
                {errorMessage}
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-medium">{t.personalInfo}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.fullName}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.fullName}
                          {...field}
                          disabled={isSubmitting}
                          className={isRTL ? "text-right" : "text-left"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.phoneNumber}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.phoneNumber}
                          {...field}
                          disabled={isSubmitting}
                          className={isRTL ? "text-right" : "text-left"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h3 className="font-medium">{t.paymentMethod}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={
                    selectedPayment === "CASH_ON_DELIVERY"
                      ? "default"
                      : "outline"
                  }
                  className="flex flex-col items-center justify-center h-24 gap-2 hover:bg-green-500  hover:text-white"
                  onClick={() => handlePaymentSelect("CASH_ON_DELIVERY")}
                  disabled={isSubmitting}
                  aria-pressed={selectedPayment === "CASH_ON_DELIVERY"}
                  aria-label={t.cash_on_delivery}
                >
                  <Truck className="h-6 w-6" />
                  <span>{t.cash_on_delivery}</span>
                </Button>

                <Button
                  type="button"
                  variant={
                    selectedPayment === "PAYMENT_AT_BRANCH"
                      ? "default"
                      : "outline"
                  }
                  className="flex flex-col items-center justify-center h-24 gap-2 hover:bg-green-500 hover:text-white"
                  onClick={() => handlePaymentSelect("PAYMENT_AT_BRANCH")}
                  disabled={isSubmitting}
                  aria-pressed={selectedPayment === "PAYMENT_AT_BRANCH"}
                  aria-label={t.payment_at_branch}
                >
                  <Building className="h-6 w-6" />
                  <span>{t.payment_at_branch}</span>
                </Button>
              </div>

              {selectedPayment === "CASH_ON_DELIVERY" && (
                <div className="mt-2  text-sm p-2 bg-slate-50 rounded-md text-blue-700 ">
                  {t.codDescription}
                </div>
              )}

              {selectedPayment === "PAYMENT_AT_BRANCH" && (
                <div className="mt-2 bg-slate-50 rounded-lg p-2 text-blue-700 text-sm ">
                  {t.branchPaymentDescription}
                </div>
              )}

              {form.formState.errors.paymentMethod && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Conditional Fields Based on Payment Method */}
            {selectedPayment === "CASH_ON_DELIVERY" && (
              <div className="space-y-4">
                <h3 className="font-medium text-green-600">{t.shippingAddress}</h3>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>{t.address}</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder={t.address}
                          {...field}
                          disabled={isSubmitting}
                          className={isRTL ? "text-right" : "text-left"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {selectedPayment === "PAYMENT_AT_BRANCH" && (
              <div className="space-y-4">
                <h3 className="font-medium">{t.branch}</h3>
                <FormField
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-600">{t.selectBranch}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectBranch} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem className="focus:bg-green-500 focus:text-white" key={branch.id} value={branch.id}>
                              {locale === "ar" && branch.nameAr
                                ? branch.nameAr
                                : branch.nameEn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">{t.orderSummary}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span>{formater.format(totalPrice)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>{t.shipping}</span>
                  <span>{t.free}</span>
                </div> */}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>{t.total}</span>
                  <span className="text-lg">{formater.format(totalPrice)}</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4">

            
            <Button
              type="submit"
              disabled={isSubmitting || !selectedPayment}
              className="gap-2 w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.processing}
                </>
              ) : (
                t.placeOrder
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => removeAll()}
              disabled={isSubmitting}
            >
              {t.clearCart}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
