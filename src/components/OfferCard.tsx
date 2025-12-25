import { motion } from "framer-motion";
import { Copy, Check, Clock } from "lucide-react";
import { useState } from "react";
import { Offer } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

interface OfferCardProps {
  offer: Offer;
  index?: number;
}

export function OfferCard({ offer, index = 0 }: OfferCardProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    toast({
      title: "Code copied!",
      description: `${offer.code} has been copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const daysLeft = Math.ceil(
    (new Date(offer.validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative gradient-rose rounded-2xl p-5 text-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold">{offer.title}</h3>
            <p className="text-white/80 text-sm mt-1">{offer.description}</p>
          </div>
          <div className="text-2xl font-bold">
            {typeof offer.discount === "number" && offer.discount > 100
              ? `₹${offer.discount}`
              : `${offer.discount}%`}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={copyCode}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors"
          >
            <span className="font-mono">{offer.code}</span>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <div className="flex items-center gap-1 text-sm text-white/80">
            <Clock className="w-4 h-4" />
            <span>{daysLeft} days left</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
