import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Star, Clock, Share2 } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { services, artists } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, setBooking } = useApp();

  const service = services.find((s) => s.id === id);
  const availableArtists = artists.filter((a) => a.available);

  if (!service) {
    return (
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Service not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/services")}>
            Back to Services
          </Button>
        </div>
      </PageContainer>
    );
  }

  const isFavorite = favorites.includes(service.id);

  const handleBookNow = () => {
    setBooking({ service });
    navigate("/booking/step1");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-72">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Top actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(service.id)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft"
            >
              <Heart
                className={cn(
                  "w-5 h-5",
                  isFavorite ? "fill-primary text-primary" : "text-foreground"
                )}
              />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          {/* Category */}
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {service.category}
          </span>

          {/* Title & Rating */}
          <h1 className="font-display text-2xl font-bold text-foreground mt-2">
            {service.name}
          </h1>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-gold text-gold" />
              <span className="font-semibold">{service.rating}</span>
              <span className="text-muted-foreground">({service.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{service.duration} min</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mt-4 leading-relaxed">
            {service.description}
          </p>

          {/* What's included */}
          <div className="mt-6">
            <h3 className="font-semibold text-foreground mb-3">What's Included</h3>
            <ul className="space-y-2">
              {[
                "Professional consultation",
                "Premium products used",
                "Touch-up kit (for bridal)",
                "Long-lasting finish",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Available Artists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <h3 className="font-semibold text-foreground mb-3">
            Available Artists ({availableArtists.length})
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {availableArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex-shrink-0 w-20 text-center"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-rose-light"
                />
                <p className="text-xs font-medium text-foreground mt-2 truncate">
                  {artist.name.split(" ")[0]}
                </p>
                <p className="text-xs text-muted-foreground">{artist.rating} ⭐</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-foreground">
              ₹{service.price.toLocaleString()}
            </p>
          </div>
          <Button variant="rose" size="lg" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
