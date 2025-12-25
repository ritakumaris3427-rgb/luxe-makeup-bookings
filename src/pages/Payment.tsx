import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Wallet, Smartphone, Loader2 } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", name: "UPI", icon: Smartphone },
  { id: "wallet", name: "Wallet", icon: Wallet },
];

export default function Payment() {
  const navigate = useNavigate();
  const { booking, addBooking, resetBooking } = useApp();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  if (!booking.service) {
    navigate("/services");
    return null;
  }

  const subtotal = booking.service.price;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax - booking.discount;

  const handlePayment = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    addBooking({
      id: Date.now().toString(),
      serviceId: booking.service!.id,
      artistId: booking.artist!.id,
      date: booking.date,
      time: booking.time,
      status: "upcoming",
      total,
    });
    
    resetBooking();
    navigate("/success");
  };

  return (
    <PageContainer className="pt-4" withBottomNav={false}>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display text-xl font-bold text-foreground">Payment</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border transition-all",
              selectedMethod === method.id ? "border-primary bg-rose-light/50" : "border-border bg-card"
            )}
          >
            <method.icon className="w-6 h-6 text-primary" />
            <span className="font-medium text-foreground">{method.name}</span>
          </button>
        ))}
      </motion.div>

      {selectedMethod === "card" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl p-4 shadow-card mb-6 space-y-4">
          <Input placeholder="Card Number" className="h-12 rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="MM/YY" className="h-12 rounded-xl" />
            <Input placeholder="CVV" className="h-12 rounded-xl" />
          </div>
          <Input placeholder="Cardholder Name" className="h-12 rounded-xl" />
        </motion.div>
      )}

      <div className="bg-card rounded-2xl p-4 shadow-card mb-24">
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Total</span>
          <span className="font-bold text-xl text-foreground">₹{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-4">
        <Button variant="rose" size="lg" className="w-full" onClick={handlePayment} disabled={loading}>
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : `Pay ₹${total.toLocaleString()}`}
        </Button>
      </div>
    </PageContainer>
  );
}
