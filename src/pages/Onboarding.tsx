import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const slides = [
  {
    icon: Sparkles,
    title: "Discover Premium Makeup",
    description: "Find the best makeup artists near you with personalized recommendations",
    color: "from-primary/20 to-rose-light",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book your favorite services in just a few taps with flexible scheduling",
    color: "from-gold/20 to-gold-light",
  },
  {
    icon: Heart,
    title: "Look Your Best",
    description: "Get stunning looks for every occasion from weddings to parties",
    color: "from-blush to-rose-light",
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
      navigate("/login");
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </div>

      {/* Slides */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            {/* Icon */}
            <div
              className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center mb-8`}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-16 h-16 text-primary" />;
              })()}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              {slides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-sm">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="p-8">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="rose"
          size="xl"
          className="w-full"
          onClick={handleNext}
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
}
