import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Heart, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const menuItems = [
    { icon: Heart, label: "Favorites", path: "/favorites" },
    { icon: MapPin, label: "Saved Addresses", path: "/addresses" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <PageContainer className="pt-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="w-24 h-24 rounded-full gradient-rose mx-auto flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">{user.name || "Guest"}</h1>
        <p className="text-muted-foreground">{user.email || "Not logged in"}</p>
      </motion.div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden mb-6">
        {menuItems.map((item, index) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-foreground">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Button variant="outline" className="w-full text-destructive border-destructive/30" onClick={handleLogout}>
        <LogOut className="w-5 h-5" /> Logout
      </Button>
    </PageContainer>
  );
}
