import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
  withBottomNav?: boolean;
}

export function PageContainer({
  children,
  className,
  withPadding = true,
  withBottomNav = true,
}: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "min-h-screen bg-background",
        withPadding && "px-4",
        withBottomNav && "pb-24",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
