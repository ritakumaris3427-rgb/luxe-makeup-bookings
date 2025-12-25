import { PageContainer } from "@/components/layout/PageContainer";
import { BookingCard } from "@/components/BookingCard";
import { useApp } from "@/contexts/AppContext";

export default function Bookings() {
  const { bookings } = useApp();

  return (
    <PageContainer className="pt-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bookings yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <BookingCard key={booking.id} booking={booking} index={index} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
