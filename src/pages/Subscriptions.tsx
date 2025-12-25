import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { subscriptions } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

export default function Subscriptions() {
  const navigate = useNavigate();

  const handleSubscribe = (planName: string) => {
    toast({ title: "Coming Soon", description: `${planName} subscription will be available soon!` });
  };

  return (
    <PageContainer className="pt-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Memberships</h1>
      <p className="text-muted-foreground mb-6">Get exclusive benefits and discounts</p>
      <div className="space-y-4">
        {subscriptions.map((plan, index) => (
          <SubscriptionCard key={plan.id} plan={plan} index={index} onSubscribe={() => handleSubscribe(plan.name)} />
        ))}
      </div>
    </PageContainer>
  );
}
