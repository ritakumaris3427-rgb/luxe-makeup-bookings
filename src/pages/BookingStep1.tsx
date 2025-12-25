import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArtistCard } from "@/components/ArtistCard";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { artists } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

export default function BookingStep1() {
  const navigate = useNavigate();
  const { booking, setBooking } = useApp();

  const availableArtists = artists.filter((a) => a.available);

  const handleSelectArtist = (artist: typeof artists[0]) => {
    if (!artist.available) {
      toast({
        title: "Artist unavailable",
        description: "This artist is currently not available",
        variant: "destructive",
      });
      return;
    }
    setBooking({ artist });
  };

  const handleContinue = () => {
    if (!booking.artist) {
      toast({
        title: "Select an artist",
        description: "Please select an artist to continue",
        variant: "destructive",
      });
      return;
    }
    navigate("/booking/step2");
  };

  if (!booking.service) {
    navigate("/services");
    return null;
  }

  return (
    <PageContainer className="pt-4" withBottomNav={false}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-xl font-bold text-foreground">
            Select Artist
          </h1>
          <p className="text-sm text-muted-foreground">Step 1 of 3</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 h-1 rounded-full bg-primary" />
        <div className="flex-1 h-1 rounded-full bg-muted" />
        <div className="flex-1 h-1 rounded-full bg-muted" />
      </div>

      {/* Selected Service */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-6"
      >
        <div className="flex items-center gap-4">
          <img
            src={booking.service.image}
            alt={booking.service.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{booking.service.name}</h3>
            <p className="text-sm text-muted-foreground">
              {booking.service.duration} min • ₹{booking.service.price.toLocaleString()}
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </motion.div>

      {/* Artists List */}
      <div className="space-y-3 mb-24">
        <h2 className="font-semibold text-foreground">Available Artists</h2>
        {availableArtists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            index={index}
            selected={booking.artist?.id === artist.id}
            onSelect={() => handleSelectArtist(artist)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-4">
        <Button
          variant="rose"
          size="lg"
          className="w-full"
          onClick={handleContinue}
          disabled={!booking.artist}
        >
          Continue
        </Button>
      </div>
    </PageContainer>
  );
}
