import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Service, Artist, Booking } from "@/lib/data";

interface User {
  isLoggedIn: boolean;
  hasSeenOnboarding: boolean;
  hasSeenSplash: boolean;
  hasDetectedLocation: boolean;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
}

interface BookingState {
  service: Service | null;
  artist: Artist | null;
  date: string;
  time: string;
  promoCode: string;
  discount: number;
}

interface AppContextType {
  user: User;
  booking: BookingState;
  bookings: Booking[];
  favorites: string[];
  setUser: (user: Partial<User>) => void;
  setBooking: (booking: Partial<BookingState>) => void;
  addBooking: (booking: Booking) => void;
  toggleFavorite: (serviceId: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: () => void;
  completeSplash: () => void;
  completeLocationDetection: (city: string) => void;
  resetBooking: () => void;
}

const defaultUser: User = {
  isLoggedIn: false,
  hasSeenOnboarding: false,
  hasSeenSplash: false,
  hasDetectedLocation: false,
  name: "",
  email: "",
  phone: "",
  location: "Detecting...",
};

const defaultBooking: BookingState = {
  service: null,
  artist: null,
  date: "",
  time: "",
  promoCode: "",
  discount: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(() => {
    const saved = localStorage.getItem("luxe_user");
    return saved ? { ...defaultUser, ...JSON.parse(saved) } : defaultUser;
  });

  const [booking, setBookingState] = useState<BookingState>(defaultBooking);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("luxe_bookings");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("luxe_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist user data
  useEffect(() => {
    localStorage.setItem("luxe_user", JSON.stringify(user));
  }, [user]);

  // Persist bookings
  useEffect(() => {
    localStorage.setItem("luxe_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("luxe_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const setUser = (updates: Partial<User>) => {
    setUserState((prev) => ({ ...prev, ...updates }));
  };

  const setBooking = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const addBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const toggleFavorite = (serviceId: string) => {
    setFavorites((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUserState((prev) => ({
      ...prev,
      isLoggedIn: true,
      email,
      name: email.split("@")[0],
    }));
    return true;
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUserState((prev) => ({
      ...prev,
      isLoggedIn: true,
      name,
      email,
    }));
    return true;
  };

  const logout = () => {
    setUserState({ ...defaultUser, hasSeenOnboarding: true, hasSeenSplash: true, hasDetectedLocation: true, location: user.location });
  };

  const completeOnboarding = () => {
    setUserState((prev) => ({ ...prev, hasSeenOnboarding: true }));
  };

  const completeSplash = () => {
    setUserState((prev) => ({ ...prev, hasSeenSplash: true }));
  };

  const completeLocationDetection = (city: string) => {
    setUserState((prev) => ({ ...prev, hasDetectedLocation: true, location: city }));
  };

  const resetBooking = () => {
    setBookingState(defaultBooking);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        booking,
        bookings,
        favorites,
        setUser,
        setBooking,
        addBooking,
        toggleFavorite,
        login,
        signup,
        logout,
        completeOnboarding,
        completeSplash,
        completeLocationDetection,
        resetBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
