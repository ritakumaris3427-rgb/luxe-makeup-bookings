import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Tag, Check } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { offers } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

export default function BookingStep3() {
  const navigate = useNavigate();
  const { booking, setBooking } = useApp();
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromo = () => {
    const offer = offers.find(
      (o) => o.code.toLowerCase() === promoInput.toLowerCase()
    );

    if (!offer) {
      toast({
        title: "Invalid code",
        description: "This promo code is not valid",
        variant: "destructive",
      });
      return;
    }

    const discount =
      offer.discount > 100
        ? offer.discount
        : Math.round((booking.service?.price || 0) * (offer.discount / 100));

    setBooking({ promoCode: offer.code, discount });
    setPromoApplied(true);
    toast({
      title: "Promo applied!",
      description: `You saved ₹${discount}`,
    });
  };

  const removePromo = () => {
    setBooking({ promoCode: "", discount: 0 });
    setPromoApplied(false);
    setPromoInput("");
  };

  if (!booking.service || !booking.artist || !booking.date || !booking.time) {
    navigate("/services");
    return null;
  }

  const subtotal = booking.service.price;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax - booking.discount;

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  return (
    <PageContainer className="pt-4" withBottomNav={false}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-xl font-bold text-foreground">
            Review Booking
          </h1>
          <p className="text-sm text-muted-foreground">Step 3 of 3</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 h-1 rounded-full bg-primary" />
        <div className="flex-1 h-1 rounded-full bg-primary" />
        <div className="flex-1 h-1 rounded-full bg-primary" />
      </div>

      {/* Service Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-4"
      >
        <div className="flex gap-4">
          <img
            src={booking.service.image}
            alt={booking.service.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{booking.service.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {booking.service.duration} minutes
            </p>
          </div>
        </div>
      </motion.div>

      {/* Booking Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-4 space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Artist</p>
            <p className="font-medium text-foreground">{booking.artist.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="font-medium text-foreground">{booking.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="font-medium text-foreground">{booking.time}</p>
          </div>
        </div>
      </motion.div>

      {/* Promo Code */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Tag className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Promo Code</span>
        </div>

        {promoApplied ? (
          <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">{booking.promoCode}</span>
            </div>
            <button
              onClick={removePromo}
              className="text-sm text-destructive hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              className="flex-1 h-12 rounded-xl bg-background"
            />
            <Button
              variant="outline"
              className="h-12 px-6"
              onClick={applyPromo}
              disabled={!promoInput}
            >
              Apply
            </Button>
          </div>
        )}
      </motion.div>

      {/* Price Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-24"
      >
        <h3 className="font-semibold text-foreground mb-4">Price Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service charge</span>
            <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (18%)</span>
            <span className="text-foreground">₹{tax.toLocaleString()}</span>
          </div>
          {booking.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-₹{booking.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-xl text-foreground">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-4">
        <Button
          variant="rose"
          size="lg"
          className="w-full"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment • ₹{total.toLocaleString()}
        </Button>
      </div>
    </PageContainer>
  );
}
