import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Artist } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
}

export function ArtistCard({ artist, index = 0, selected, onSelect }: ArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "relative bg-card rounded-2xl p-4 shadow-card cursor-pointer transition-all duration-200",
        selected && "ring-2 ring-primary shadow-soft",
        !artist.available && "opacity-60"
      )}
    >
      {selected && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-5 h-5 text-primary fill-rose-light" />
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-rose-light"
          />
          {artist.available && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{artist.name}</h3>
          <p className="text-sm text-muted-foreground">{artist.speciality}</p>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="font-medium">{artist.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{artist.location}</span>
            </div>
          </div>
        </div>
      </div>

      {!artist.available && (
        <div className="mt-3 text-center text-sm text-muted-foreground bg-muted rounded-lg py-2">
          Currently unavailable
        </div>
      )}
    </motion.div>
  );
}
