
export type CurrencyCode = "INR" | "USD" | "AUD" | "EUR" | "GBP";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  label: string;
}

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", label: "India (INR)" },
  { code: "USD", symbol: "$", label: "USA (USD)" },
  { code: "AUD", symbol: "A$", label: "Australia (AUD)" },
  { code: "EUR", symbol: "€", label: "Europe (EUR)" },
  { code: "GBP", symbol: "£", label: "UK (GBP)" },
];

export interface ContractPeriod {
  months: number;
  label: string;
  discount: number; // Decimal percentage (e.g. 0.05 for 5%)
}

export const CONTRACT_PERIODS: ContractPeriod[] = [
  { months: 1, label: "Monthly", discount: 0 },
  { months: 6, label: "6 Months", discount: 0.05 },
  { months: 12, label: "12 Months", discount: 0.15 },
  { months: 24, label: "24 Months", discount: 0.25 },
];

export interface ServiceItem {
  id: string;
  name: string;
  prices: Record<CurrencyCode, number>;
  category: string;
  icon: string;
}

export const PRICING_CATEGORIES = [
  "Digital Presence",
  "Growth & Lead Gen",
  "AI & WhatsApp",
  "Business Operations"
];

export const PRICING_SERVICES: ServiceItem[] = [
  // Digital Presence
  { 
    id: "essential-os", 
    name: "Essential One-Page OS", 
    prices: { INR: 2999, USD: 99, AUD: 149, EUR: 89, GBP: 79 },
    category: "Digital Presence", 
    icon: "Globe" 
  },
  { 
    id: "multi-page-os", 
    name: "Multi-Page Business OS", 
    prices: { INR: 4999, USD: 149, AUD: 219, EUR: 139, GBP: 119 },
    category: "Digital Presence", 
    icon: "Layers" 
  },
  { 
    id: "ecommerce-os", 
    name: "Enterprise E-commerce OS", 
    prices: { INR: 9999, USD: 299, AUD: 449, EUR: 279, GBP: 239 },
    category: "Digital Presence", 
    icon: "ShoppingBag" 
  },
  { 
    id: "custom-dashboard", 
    name: "Custom Admin Dashboard", 
    prices: { INR: 7499, USD: 249, AUD: 369, EUR: 229, GBP: 199 },
    category: "Digital Presence", 
    icon: "LayoutDashboard" 
  },

  // Growth & Lead Gen
  { 
    id: "lead-capture-engine", 
    name: "AI Lead Capture Engine", 
    prices: { INR: 3999, USD: 149, AUD: 219, EUR: 139, GBP: 119 },
    category: "Growth & Lead Gen", 
    icon: "UserPlus" 
  },
  { 
    id: "sales-funnel-auto", 
    name: "Automated Sales Funnel", 
    prices: { INR: 5999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "Growth & Lead Gen", 
    icon: "Filter" 
  },
  { 
    id: "aeo-seo-pack", 
    name: "AEO/SEO Growth Pack", 
    prices: { INR: 4999, USD: 159, AUD: 239, EUR: 149, GBP: 129 },
    category: "Growth & Lead Gen", 
    icon: "Search" 
  },
  { 
    id: "ad-manager-os", 
    name: "Multi-Channel Ads Manager", 
    prices: { INR: 7999, USD: 299, AUD: 449, EUR: 279, GBP: 239 },
    category: "Growth & Lead Gen", 
    icon: "TrendingUp" 
  },

  // AI & WhatsApp
  { 
    id: "whatsapp-ai-agent", 
    name: "24/7 WhatsApp AI Agent", 
    prices: { INR: 3999, USD: 149, AUD: 219, EUR: 139, GBP: 119 },
    category: "AI & WhatsApp", 
    icon: "Bot" 
  },
  { 
    id: "whatsapp-crm-tracking", 
    name: "WhatsApp CRM & Tracking", 
    prices: { INR: 2499, USD: 89, AUD: 129, EUR: 79, GBP: 69 },
    category: "AI & WhatsApp", 
    icon: "MessageSquareText" 
  },
  { 
    id: "whatsapp-broadcast", 
    name: "WhatsApp Broadcast Engine", 
    prices: { INR: 1999, USD: 69, AUD: 99, EUR: 65, GBP: 59 },
    category: "AI & WhatsApp", 
    icon: "Zap" 
  },
  { 
    id: "voice-ai-ivr", 
    name: "Voice AI & IVR System", 
    prices: { INR: 5999, USD: 249, AUD: 369, EUR: 229, GBP: 199 },
    category: "AI & WhatsApp", 
    icon: "Mic" 
  },

  // Business Operations
  { 
    id: "crm-os-module", 
    name: "AI CRM Module", 
    prices: { INR: 3499, USD: 129, AUD: 189, EUR: 119, GBP: 99 },
    category: "Business Operations", 
    icon: "Database" 
  },
  { 
    id: "auto-booking-system", 
    name: "Auto-Booking System", 
    prices: { INR: 1999, USD: 79, AUD: 119, EUR: 75, GBP: 65 },
    category: "Business Operations", 
    icon: "Calendar" 
  },
  { 
    id: "workflow-engine", 
    name: "Custom Workflow Engine", 
    prices: { INR: 4499, USD: 159, AUD: 239, EUR: 149, GBP: 129 },
    category: "Business Operations", 
    icon: "Repeat" 
  },
  { 
    id: "system-maintenance", 
    name: "Maintenance & Security", 
    prices: { INR: 1499, USD: 59, AUD: 89, EUR: 55, GBP: 49 },
    category: "Business Operations", 
    icon: "ShieldCheck" 
  },
];
