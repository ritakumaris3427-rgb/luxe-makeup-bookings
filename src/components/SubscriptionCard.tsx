import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Subscription } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionCardProps {
  plan: Subscription;
  index?: number;
  onSubscribe?: () => void;
}

export function SubscriptionCard({ plan, index = 0, onSubscribe }: SubscriptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className={cn(
        "relative bg-card rounded-2xl p-6 shadow-card border transition-all duration-300",
        plan.popular ? "border-primary shadow-soft" : "border-border"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-rose text-white text-xs font-medium">
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
        <div className="mt-3">
          <span className="text-3xl font-bold text-foreground">₹{plan.price}</span>
          <span className="text-muted-foreground">/{plan.period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-rose-light flex items-center justify-center">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSubscribe}
        variant={plan.popular ? "rose" : "outline"}
        className="w-full"
      >
        Subscribe Now
      </Button>
    </motion.div>
  );
}
