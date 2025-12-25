import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { BottomNav } from "@/components/layout/BottomNav";
import { SplashScreen } from "@/components/SplashScreen";
import { LocationPermission } from "@/components/LocationPermission";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import BookingStep1 from "./pages/BookingStep1";
import BookingStep2 from "./pages/BookingStep2";
import BookingStep3 from "./pages/BookingStep3";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Offers from "./pages/Offers";
import Bookings from "./pages/Bookings";
import Subscriptions from "./pages/Subscriptions";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, completeSplash, completeLocationDetection } = useApp();
  const location = useLocation();
  
  const showBottomNav = ["/home", "/services", "/offers", "/bookings", "/profile"].includes(location.pathname);

  // Show splash screen first
  if (!user.hasSeenSplash) {
    return <SplashScreen onComplete={completeSplash} />;
  }

  // Then show location detection
  if (!user.hasDetectedLocation) {
    return (
      <LocationPermission
        onLocationDetected={(city) => completeLocationDetection(city)}
        onSkip={() => completeLocationDetection("Mumbai")}
      />
    );
  }

  // Then show onboarding if not seen
  if (!user.hasSeenOnboarding) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/booking/step1" element={<BookingStep1 />} />
        <Route path="/booking/step2" element={<BookingStep2 />} />
        <Route path="/booking/step3" element={<BookingStep3 />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showBottomNav && <BottomNav />}
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
