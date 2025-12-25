import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer } from "@/components/layout/PageContainer";
import { BookingCard } from "@/components/BookingCard";
import { useApp } from "@/contexts/AppContext";
import { CalendarX } from "lucide-react";

export default function Bookings() {
  const { bookings } = useApp();
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingBookings = bookings.filter((b) => b.status === "upcoming");
  const completedBookings = bookings.filter((b) => b.status === "completed");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  const EmptyState = ({ message }: { message: string }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <CalendarX className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-center">{message}</p>
    </motion.div>
  );

  return (
    <PageContainer className="pt-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">
          My Bookings
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 bg-muted/50 rounded-xl p-1">
            <TabsTrigger
              value="upcoming"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft"
            >
              Upcoming
              {upcomingBookings.length > 0 && (
                <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5">
                  {upcomingBookings.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <EmptyState message="No upcoming bookings. Book a service to get started!" />
            ) : (
              upcomingBookings.map((booking, index) => (
                <BookingCard key={booking.id} booking={booking} index={index} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBookings.length === 0 ? (
              <EmptyState message="No completed bookings yet." />
            ) : (
              completedBookings.map((booking, index) => (
                <BookingCard key={booking.id} booking={booking} index={index} />
              ))
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings.length === 0 ? (
              <EmptyState message="No cancelled bookings." />
            ) : (
              cancelledBookings.map((booking, index) => (
                <BookingCard key={booking.id} booking={booking} index={index} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </PageContainer>
  );
}
