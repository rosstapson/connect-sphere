import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCancelPage() {
  const [, setLocation] = useLocation();

  // Get query parameters from URL if PayFast sends any
  const searchParams = new URLSearchParams(window.location.search);
  const reason = searchParams.get("reason") || "Payment was cancelled";

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-red-950 dark:to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="border-2 border-red-200 dark:border-red-800 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <XCircle className="h-24 w-24 text-red-500 mx-auto" />
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-400">
              Payment Cancelled
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Your subscription has not been activated
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-red-50 dark:bg-red-950/50 rounded-lg p-4">
              <p className="text-sm text-center text-muted-foreground">
                {reason}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">
                Don't worry, no charges have been made to your account. You can try again or contact our support team if you need assistance.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full rounded-full h-12 text-base font-semibold"
                onClick={() => setLocation("/subscriptions")}
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              
              <Button
                variant="outline"
                className="w-full rounded-full h-12"
                onClick={() => setLocation("/")}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-center text-muted-foreground">
                Need help? <a href="mailto:support@connectsphere.com" className="text-primary hover:underline">Contact Support</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
