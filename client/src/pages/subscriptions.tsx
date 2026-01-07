import { Navbar } from "@/components/layout/Navbar";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { RightSidebar } from "@/components/sidebar/RightSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, ChevronLeft } from "lucide-react";

const SERVICES = [
  { id: 'planning', name: 'Strategic Planning', price: '$29/mo', desc: 'Advanced goal setting and roadmapping tools.' },
  { id: 'tracking', name: 'Real-time Tracking', price: '$19/mo', desc: 'Monitor your projects with live updates and analytics.' },
  { id: 'warehousing', name: 'Smart Warehousing', price: '$99/mo', desc: 'Enterprise inventory management and automation.' },
  { id: 'finance', name: 'Financial Insights', price: '$49/mo', desc: 'Automated bookkeeping and revenue forecasting.' }
];

export default function SubscriptionsPage() {
  const [step, setStep] = useState<'list' | 'payment' | 'success'>('list');
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  const handleSubscribe = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    setStep('payment');
  };

  const handlePayment = () => {
    setStep('success');
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SERVICES.map((service) => (
                      <Card key={service.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{service.price}</Badge>
                          </div>
                          <CardDescription>{service.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Professional features</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Priority support</li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full rounded-full font-semibold" 
                            onClick={() => handleSubscribe(service)}
                            data-testid={`button-subscribe-${service.id}`}
                          >
                            Subscribe Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
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
                      <Button variant="ghost" className="w-fit p-0 h-auto mb-4 hover:bg-transparent text-muted-foreground hover:text-foreground" onClick={() => setStep('list')}>
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to services
                      </Button>
                      <CardTitle>Complete Subscription</CardTitle>
                      <CardDescription>You are subscribing to {selectedService.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                        <span className="font-medium">{selectedService.name}</span>
                        <span className="font-bold">{selectedService.price}</span>
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
                      <Button className="w-full rounded-full h-12 text-lg font-bold" onClick={handlePayment} data-testid="button-confirm-payment">
                        Pay {selectedService.price}
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
