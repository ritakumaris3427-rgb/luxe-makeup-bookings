import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Home, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/Confetti";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <Confetti />
      
      {/* Background decoration */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute w-96 h-96 rounded-full bg-primary blur-3xl"
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-28 h-28 rounded-full gradient-rose flex items-center justify-center mb-8 shadow-glow"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <CheckCircle className="w-14 h-14 text-white" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-3xl font-bold text-foreground mb-3"
      >
        Booking Confirmed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-2 max-w-xs"
      >
        Your appointment has been successfully booked
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-muted-foreground mb-8"
      >
        A confirmation has been sent to your email
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <Button variant="rose" size="lg" onClick={() => navigate("/bookings")}>
          <Calendar className="w-5 h-5" /> View My Bookings
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate("/services")}>
          Book Another Service
        </Button>
        <Button variant="ghost" size="lg" onClick={() => navigate("/home")}>
          <Home className="w-5 h-5" /> Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
