import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Bell, ChevronRight, Sparkles, Star } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ServiceCard } from "@/components/ServiceCard";
import { ArtistCard } from "@/components/ArtistCard";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { services, artists, offers } from "@/lib/data";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useApp();

  const featuredServices = services.filter((s) => s.popular).slice(0, 4);
  const popularArtists = artists.filter((a) => a.available).slice(0, 3);

  return (
    <PageContainer className="pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-muted-foreground">Welcome back,</p>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {user.name || "Guest"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </button>
          <button 
            onClick={() => navigate("/notifications")}
            className="relative w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft hover:scale-105 transition-transform"
          >
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </motion.div>

      {/* Hero CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative gradient-rose rounded-3xl p-6 mb-8 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white/90 text-sm font-medium">Premium Makeup</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Book Your Perfect Look
          </h2>
          <p className="text-white/80 text-sm mb-4">
            Professional artists • Home service available
          </p>
          <Button
            onClick={() => navigate("/services")}
            className="bg-white text-primary hover:bg-white/90"
          >
            Book Now
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Offers Section */}
      {offers.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Special Offers
            </h2>
            <button
              onClick={() => navigate("/offers")}
              className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {offers.slice(0, 2).map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Services */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Featured Services
          </h2>
          <button
            onClick={() => navigate("/services")}
            className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Top Artists Near You
          </h2>
        </div>
        <div className="space-y-3">
          {popularArtists.map((artist, index) => (
            <ArtistCard key={artist.id} artist={artist} index={index} />
          ))}
        </div>
      </section>

      {/* Subscription CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-5 shadow-card border border-border mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center">
            <Star className="w-6 h-6 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Go Premium</h3>
            <p className="text-sm text-muted-foreground">Get up to 25% off on all bookings</p>
          </div>
          <Button
            variant="gold"
            size="sm"
            onClick={() => navigate("/subscriptions")}
          >
            Explore
          </Button>
        </div>
      </motion.div>
    </PageContainer>
  );
}
