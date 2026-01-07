import { Navbar } from "@/components/layout/Navbar";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { RightSidebar } from "@/components/sidebar/RightSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, ChevronLeft, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubscriptionPlan } from "@shared/schema";

// Fetch subscription plans
async function fetchSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const response = await fetch("/api/subscription-plans");
  if (!response.ok) {
    throw new Error("Failed to fetch subscription plans");
  }
  return response.json();
}

// Create subscription
async function createSubscription(userId: string, planId: string) {
  const response = await fetch(`/api/users/${userId}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planId, autoRenew: true }),
  });

  if (!response.ok) {
    throw new Error("Failed to create subscription");
  }

  return response.json();
}

async function startCheckout(planId: string) {
  const response = await fetch(`/api/billing/start-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });

  if (!response.ok) throw new Error("Failed to start checkout");
  return response.json() as Promise<{ checkoutId: string; redirectUrl: string }>;
}


export default function SubscriptionsPage() {
  const [step, setStep] = useState<'list' | 'payment' | 'success'>('list');
  const [selectedService, setSelectedService] = useState<SubscriptionPlan | null>(null);
  const queryClient = useQueryClient();

  // Fetch subscription plans from API
  const { data: plans = [], isLoading, error } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: fetchSubscriptionPlans,
  });

  const startCheckoutMutation = useMutation({
    mutationFn: (planId: string) => startCheckout(planId),
    onSuccess: ({ redirectUrl }) => {
      window.location.href = redirectUrl;
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to start checkout");
    },
  });


  // Mutation for creating subscription
  const createSubscriptionMutation = useMutation({
    mutationFn: (planId: string) => {
      // In a real app, you'd get the userId from auth context
      const demoUserId = "demo-user-id"; // Replace with actual user ID from Keycloak
      return createSubscription(demoUserId, planId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
      setStep('success');
    },
    onError: (error) => {
      console.error("Failed to create subscription:", error);
      alert("Failed to create subscription. Please try again.");
    }
  });

  const handleSubscribe = (service: SubscriptionPlan) => {
    setSelectedService(service);
    setStep('payment');
  };

  const handlePayment = () => {
  if (selectedService) startCheckoutMutation.mutate(selectedService.id);
};

  const formatPrice = (price: string, billingCycle: string) => {
    const priceNum = parseFloat(price);
    if (billingCycle === 'yearly') {
      return `$${priceNum}/yr`;
    }
    return `$${priceNum}/mo`;
  };

  const parseFeatures = (features: string | null): string[] => {
    if (!features) return [];
    try {
      return JSON.parse(features);
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-black font-sans">
      <Navbar />

      <main className="flex justify-center pt-6 px-4 pb-10">
        <div className="w-full max-w-[1128px] grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-3 lg:col-span-3">
            <LeftSidebar />
          </div>

          <div className="col-span-1 md:col-span-9 lg:col-span-9">
            <AnimatePresence mode="wait">
              {step === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                    <h1 className="text-2xl font-bold mb-2">My Subscriptions</h1>
                    <p className="text-muted-foreground">Manage your active services and explore new professional tools.</p>
                  </div>

                  {isLoading && (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}

                  {error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                      Failed to load subscription plans. Please try again later.
                    </div>
                  )}

                  {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {plans.map((plan) => {
                        const features = parseFeatures(plan.features);
                        return (
                          <Card key={plan.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{plan.name}</CardTitle>
                                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                  {formatPrice(plan.price, plan.billingCycle)}
                                </Badge>
                              </div>
                              <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {features.slice(0, 3).map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                                {features.length > 3 && (
                                  <li className="text-xs text-muted-foreground/70">
                                    + {features.length - 3} more features
                                  </li>
                                )}
                              </ul>
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full rounded-full font-semibold"
                                onClick={() => handleSubscribe(plan)}
                                data-testid={`button-subscribe-${plan.id}`}
                              >
                                Subscribe Now
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {step === 'payment' && selectedService && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="max-w-md mx-auto">
                    <CardHeader>
                      <Button
                        variant="ghost"
                        className="w-fit p-0 h-auto mb-4 hover:bg-transparent text-muted-foreground hover:text-foreground"
                        onClick={() => setStep('list')}
                        disabled={createSubscriptionMutation.isPending}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to services
                      </Button>
                      <CardTitle>Complete Subscription</CardTitle>
                      <CardDescription>You are subscribing to {selectedService.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                        <span className="font-medium">{selectedService.name}</span>
                        <span className="font-bold">{formatPrice(selectedService.price, selectedService.billingCycle)}</span>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Card Information</label>
                        <div className="flex items-center gap-2 p-3 border rounded-md bg-white">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <input placeholder="4242 4242 4242 4242" className="flex-1 bg-transparent outline-none text-sm" readOnly />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full rounded-full h-12 text-lg font-bold"
                        onClick={handlePayment}
                        disabled={createSubscriptionMutation.isPending}
                        data-testid="button-confirm-payment"
                      >
                        {createSubscriptionMutation.isPending ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          `Pay ${formatPrice(selectedService.price, selectedService.billingCycle)}`
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-card rounded-lg border border-border shadow-sm"
                >
                  <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Subscription Confirmed!</h2>
                  <p className="text-muted-foreground mb-8">Welcome to {selectedService?.name}. You now have full access to all features.</p>
                  <Button className="rounded-full px-8" onClick={() => setStep('list')}>Return to Dashboard</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
