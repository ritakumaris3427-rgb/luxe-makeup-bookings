import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationPermissionProps {
  onLocationDetected: (city: string) => void;
  onSkip: () => void;
}

export function LocationPermission({ onLocationDetected, onSkip }: LocationPermissionProps) {
  const [status, setStatus] = useState<"idle" | "detecting" | "success" | "error">("idle");
  const [city, setCity] = useState("");

  const detectLocation = async () => {
    setStatus("detecting");

    // Try GPS first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const detectedCity = data.city || data.locality || "Mumbai";
            setCity(detectedCity);
            setStatus("success");
            setTimeout(() => onLocationDetected(detectedCity), 1500);
          } catch {
            fallbackToIP();
          }
        },
        () => fallbackToIP(),
        { timeout: 5000 }
      );
    } else {
      fallbackToIP();
    }
  };

  const fallbackToIP = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const detectedCity = data.city || "Mumbai";
      setCity(detectedCity);
      setStatus("success");
      setTimeout(() => onLocationDetected(detectedCity), 1500);
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background px-6">
      <AnimatePresence mode="wait">
        {status === "detecting" && (
          <motion.div
            key="detecting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full bg-rose-light flex items-center justify-center mx-auto mb-6"
            >
              <Navigation className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Detecting Location
            </h2>
            <p className="text-muted-foreground">Finding the best services near you...</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full gradient-rose flex items-center justify-center mx-auto mb-6"
            >
              <MapPin className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Location Found!
            </h2>
            <p className="text-xl text-primary font-semibold">{city}</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Couldn't detect location
            </h2>
            <p className="text-muted-foreground mb-6">We'll use Mumbai as default</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => detectLocation()}>
                Try Again
              </Button>
              <Button variant="rose" onClick={() => onSkip()}>
                Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
