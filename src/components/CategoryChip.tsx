import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  category: { id: string; name: string; icon: string };
  selected?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ category, selected, onClick }: CategoryChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200",
        selected
          ? "gradient-rose text-white shadow-soft"
          : "bg-card border border-border text-foreground hover:border-primary/50"
      )}
    >
      <span>{category.icon}</span>
      <span className="text-sm font-medium">{category.name}</span>
    </motion.button>
  );
}
