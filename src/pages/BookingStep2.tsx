import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { timeSlots } from "@/lib/data";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function BookingStep2() {
  const navigate = useNavigate();
  const { booking, setBooking } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty slots for days before the first day
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth]);

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatSelectedDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day)) return;
    setBooking({ date: formatSelectedDate(day) });
  };

  const handleTimeSelect = (time: string) => {
    setBooking({ time });
  };

  const handleContinue = () => {
    if (!booking.date || !booking.time) {
      toast({
        title: "Select date and time",
        description: "Please select both date and time to continue",
        variant: "destructive",
      });
      return;
    }
    navigate("/booking/step3");
  };

  if (!booking.service || !booking.artist) {
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
            Select Date & Time
          </h1>
          <p className="text-sm text-muted-foreground">Step 2 of 3</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 h-1 rounded-full bg-primary" />
        <div className="flex-1 h-1 rounded-full bg-primary" />
        <div className="flex-1 h-1 rounded-full bg-muted" />
      </div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-6"
      >
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
            }
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-foreground">{monthYear}</h3>
          <button
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
            }
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <button
                  onClick={() => handleDateSelect(day)}
                  disabled={isDateDisabled(day)}
                  className={cn(
                    "w-full h-full rounded-lg flex items-center justify-center text-sm transition-all",
                    isDateDisabled(day)
                      ? "text-muted-foreground/50 cursor-not-allowed"
                      : "hover:bg-rose-light text-foreground",
                    booking.date === formatSelectedDate(day) &&
                      "gradient-rose text-white font-semibold"
                  )}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Time Slots */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-24"
      >
        <h3 className="font-semibold text-foreground mb-3">Available Time Slots</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={cn(
                "py-3 rounded-xl text-sm font-medium transition-all",
                booking.time === time
                  ? "gradient-rose text-white shadow-soft"
                  : "bg-card border border-border text-foreground hover:border-primary/50"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-4">
        <Button
          variant="rose"
          size="lg"
          className="w-full"
          onClick={handleContinue}
          disabled={!booking.date || !booking.time}
        >
          Continue
        </Button>
      </div>
    </PageContainer>
  );
}
