import { motion } from "framer-motion";
import { Heart, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Service } from "@/lib/data";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(service.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/service/${service.id}`)}
      className="relative bg-card rounded-2xl overflow-hidden shadow-card cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(service.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
            )}
          />
        </button>

        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-gold text-white text-xs font-medium">
            Popular
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm">
          <span className="font-semibold text-foreground">₹{service.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground truncate">
          {service.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {service.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-muted-foreground">({service.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{service.duration} min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
