"use client";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const OrderSuccess = () => {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      className="flex min-h-[80vh] items-center justify-center p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">
            {locale === "en"
              ? "Order Placed Successfully!"
              : "تم تقديم الطلب بنجاح!"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            {locale === "en"
              ? "Thank you for your purchase. Your order has been confirmed."
              : "شكراً لشرائك. تم تأكيد طلبك."}
          </p>
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "You'll receive an email confirmation with your order details shortly."
              : "سوف تتلقى تأكيدًا بالبريد الإلكتروني مع تفاصيل طلبك قريبًا."}
          </p>

          <div className="pt-4">
            <Button onClick={() => router.push("/")} className="w-full">
              {locale === "en" ? "Continue Shopping" : "مواصلة التسوق"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
