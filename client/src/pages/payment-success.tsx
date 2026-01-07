import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/payment/success");

  // Get query parameters from URL
  const searchParams = new URLSearchParams(window.location.search);
  const paymentId = searchParams.get("payment_id");
  const amount = searchParams.get("amount_gross");
  const itemName = searchParams.get("item_name");

  useEffect(() => {
    // You can verify the payment with PayFast here
    // Send payment_id to backend to verify and update subscription status
    if (paymentId) {
      console.log("Payment successful:", paymentId);
      // TODO: Call backend to verify and activate subscription
    }
  }, [paymentId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="border-2 border-emerald-200 dark:border-emerald-800 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="h-24 w-24 text-emerald-500 mx-auto" />
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Your subscription has been activated
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Payment ID</span>
                <span className="text-sm font-mono">{paymentId || "Processing..."}</span>
              </div>
              
              {itemName && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Subscription</span>
                  <span className="text-sm font-semibold">{itemName}</span>
                </div>
              )}
              
              {amount && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Amount Paid</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    R {parseFloat(amount).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">
                You now have full access to all features of your subscription. A confirmation email has been sent to your registered email address.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full rounded-full h-12 text-base font-semibold"
                onClick={() => setLocation("/subscriptions")}
              >
                View My Subscriptions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                className="w-full rounded-full h-12"
                onClick={() => setLocation("/")}
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
