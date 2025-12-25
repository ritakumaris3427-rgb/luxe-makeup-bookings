import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full gradient-rose flex items-center justify-center mb-8"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-3xl font-bold text-foreground mb-2"
      >
        Booking Confirmed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-8"
      >
        Your appointment has been successfully booked
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <Button variant="rose" size="lg" onClick={() => navigate("/bookings")}>
          <Calendar className="w-5 h-5" /> View Bookings
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate("/home")}>
          <Home className="w-5 h-5" /> Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
