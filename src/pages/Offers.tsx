import { PageContainer } from "@/components/layout/PageContainer";
import { OfferCard } from "@/components/OfferCard";
import { offers } from "@/lib/data";

export default function Offers() {
  return (
    <PageContainer className="pt-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Special Offers</h1>
      <div className="space-y-4">
        {offers.map((offer, index) => (
          <OfferCard key={offer.id} offer={offer} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}
