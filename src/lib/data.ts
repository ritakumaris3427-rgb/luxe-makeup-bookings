export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  popular?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  speciality: string;
  rating: number;
  reviews: number;
  experience: number;
  image: string;
  location: string;
  available: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: number;
  validUntil: string;
  minOrder?: number;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  artistId: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  total: number;
}

export const categories = [
  { id: "all", name: "All", icon: "✨" },
  { id: "bridal", name: "Bridal", icon: "👰" },
  { id: "party", name: "Party", icon: "🎉" },
  { id: "editorial", name: "Editorial", icon: "📸" },
  { id: "hd", name: "HD Makeup", icon: "💎" },
  { id: "airbrush", name: "Airbrush", icon: "🎨" },
  { id: "sfx", name: "SFX", icon: "🎭" },
];

export const services: Service[] = [
  {
    id: "1",
    name: "Bridal Glamour Package",
    category: "bridal",
    description: "Complete bridal makeup with trial session, including hairstyling and touch-up kit for your special day.",
    duration: 180,
    price: 15000,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 328,
    popular: true,
  },
  {
    id: "2",
    name: "Party Glam Look",
    category: "party",
    description: "Stunning party makeup with shimmer and glow, perfect for any celebration or night out.",
    duration: 60,
    price: 3500,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 256,
    popular: true,
  },
  {
    id: "3",
    name: "HD Flawless Finish",
    category: "hd",
    description: "High-definition makeup perfect for photography and special events with long-lasting coverage.",
    duration: 90,
    price: 5000,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "4",
    name: "Editorial Photoshoot",
    category: "editorial",
    description: "Creative and avant-garde makeup for editorial shoots, fashion shows, and artistic projects.",
    duration: 120,
    price: 8000,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 145,
  },
  {
    id: "5",
    name: "Airbrush Perfection",
    category: "airbrush",
    description: "Flawless airbrush makeup application for a smooth, camera-ready finish that lasts all day.",
    duration: 75,
    price: 6000,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 203,
  },
  {
    id: "6",
    name: "SFX Halloween Special",
    category: "sfx",
    description: "Special effects makeup for Halloween, costume parties, and theatrical performances.",
    duration: 150,
    price: 7500,
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: "7",
    name: "Natural Glow",
    category: "party",
    description: "Subtle, natural-looking makeup that enhances your features with a radiant glow.",
    duration: 45,
    price: 2500,
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 312,
    popular: true,
  },
  {
    id: "8",
    name: "Reception Ready",
    category: "bridal",
    description: "Elegant reception makeup look with dramatic eyes and flawless skin for the evening celebration.",
    duration: 90,
    price: 8500,
    image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 176,
  },
];

export const artists: Artist[] = [
  {
    id: "1",
    name: "Priya Sharma",
    speciality: "Bridal & HD Makeup",
    rating: 4.9,
    reviews: 456,
    experience: 8,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop&crop=face",
    location: "Mumbai",
    available: true,
  },
  {
    id: "2",
    name: "Meera Kapoor",
    speciality: "Editorial & Fashion",
    rating: 4.8,
    reviews: 312,
    experience: 6,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    location: "Delhi",
    available: true,
  },
  {
    id: "3",
    name: "Aisha Khan",
    speciality: "Party & Glam",
    rating: 4.7,
    reviews: 289,
    experience: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    location: "Bangalore",
    available: false,
  },
  {
    id: "4",
    name: "Riya Patel",
    speciality: "Airbrush Expert",
    rating: 4.9,
    reviews: 234,
    experience: 7,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    location: "Mumbai",
    available: true,
  },
];

export const offers: Offer[] = [
  {
    id: "1",
    title: "First Booking Offer",
    description: "Get 20% off on your first makeup booking",
    code: "LUXE20",
    discount: 20,
    validUntil: "2025-01-31",
  },
  {
    id: "2",
    title: "Bridal Special",
    description: "₹2000 off on bridal packages above ₹10000",
    code: "BRIDE2000",
    discount: 2000,
    validUntil: "2025-02-28",
    minOrder: 10000,
  },
  {
    id: "3",
    title: "Weekend Party",
    description: "15% off on party makeup this weekend",
    code: "PARTY15",
    discount: 15,
    validUntil: "2025-01-05",
  },
];

export const subscriptions: Subscription[] = [
  {
    id: "basic",
    name: "Basic",
    price: 499,
    period: "monthly",
    features: [
      "5% off on all bookings",
      "Priority booking",
      "Free cancellation",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    period: "monthly",
    features: [
      "15% off on all bookings",
      "Priority booking",
      "Free cancellation",
      "Free trial sessions",
      "Exclusive offers",
    ],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 8999,
    period: "yearly",
    features: [
      "25% off on all bookings",
      "VIP priority booking",
      "Free cancellation anytime",
      "Unlimited trial sessions",
      "Personal makeup consultant",
      "Home service priority",
    ],
  },
];

export const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM", "02:30 PM", "03:00 PM",
  "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
];
