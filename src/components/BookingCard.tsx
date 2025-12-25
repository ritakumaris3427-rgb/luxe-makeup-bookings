import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Booking, services, artists } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: Booking;
  index?: number;
}

export function BookingCard({ booking, index = 0 }: BookingCardProps) {
  const navigate = useNavigate();
  const service = services.find((s) => s.id === booking.serviceId);
  const artist = artists.find((a) => a.id === booking.artistId);

  if (!service || !artist) return null;

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card"
    >
      <div className="flex">
        <img
          src={service.image}
          alt={service.name}
          className="w-28 h-full object-cover"
        />
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{service.name}</h3>
              <p className="text-sm text-muted-foreground">by {artist.name}</p>
            </div>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium capitalize",
                statusColors[booking.status]
              )}
            >
              {booking.status}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{booking.time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="font-semibold text-foreground">
              ₹{booking.total.toLocaleString()}
            </span>
            {booking.status === "upcoming" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                View Details
              </Button>
            )}
            {booking.status === "completed" && (
              <Button
                size="sm"
                variant="rose"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                Book Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
