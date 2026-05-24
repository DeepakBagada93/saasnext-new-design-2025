
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
  "Core Infrastructure",
  "AI Systems",
  "Growth Systems",
  "Business Operations"
];

export const PRICING_SERVICES: ServiceItem[] = [
  // Core Infrastructure
  { 
    id: "premium-website", 
    name: "Premium Website", 
    prices: { INR: 2999, USD: 99, AUD: 149, EUR: 89, GBP: 79 },
    category: "Core Infrastructure", 
    icon: "Globe" 
  },
  { 
    id: "hosting-security", 
    name: "Hosting & Security", 
    prices: { INR: 999, USD: 49, AUD: 69, EUR: 45, GBP: 39 },
    category: "Core Infrastructure", 
    icon: "ShieldCheck" 
  },
  { 
    id: "website-maintenance", 
    name: "Website Maintenance", 
    prices: { INR: 999, USD: 49, AUD: 69, EUR: 45, GBP: 39 },
    category: "Core Infrastructure", 
    icon: "Settings" 
  },
  { 
    id: "analytics-dashboard", 
    name: "Analytics Dashboard", 
    prices: { INR: 1499, USD: 79, AUD: 119, EUR: 69, GBP: 59 },
    category: "Core Infrastructure", 
    icon: "BarChart3" 
  },
  { 
    id: "landing-pages", 
    name: "Landing Pages", 
    prices: { INR: 2999, USD: 99, AUD: 149, EUR: 89, GBP: 79 },
    category: "Core Infrastructure", 
    icon: "Layout" 
  },

  // AI Systems
  { 
    id: "ai-chatbot", 
    name: "AI Chatbot", 
    prices: { INR: 1999, USD: 79, AUD: 119, EUR: 69, GBP: 59 },
    category: "AI Systems", 
    icon: "MessageSquareText" 
  },
  { 
    id: "whatsapp-automation", 
    name: "WhatsApp Automation", 
    prices: { INR: 2999, USD: 129, AUD: 189, EUR: 119, GBP: 99 },
    category: "AI Systems", 
    icon: "Zap" 
  },
  { 
    id: "ai-lead-capture", 
    name: "AI Lead Capture", 
    prices: { INR: 3999, USD: 149, AUD: 219, EUR: 139, GBP: 119 },
    category: "AI Systems", 
    icon: "UserPlus" 
  },
  { 
    id: "ai-content-engine", 
    name: "AI Content Engine", 
    prices: { INR: 6999, USD: 249, AUD: 369, EUR: 229, GBP: 199 },
    category: "AI Systems", 
    icon: "PenTool" 
  },
  { 
    id: "ai-support-assistant", 
    name: "AI Support Assistant", 
    prices: { INR: 4999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "AI Systems", 
    icon: "Bot" 
  },

  // Growth Systems
  { 
    id: "seo-growth", 
    name: "SEO Growth System", 
    prices: { INR: 4999, USD: 299, AUD: 449, EUR: 279, GBP: 239 },
    category: "Growth Systems", 
    icon: "Search" 
  },
  { 
    id: "google-ads", 
    name: "Google Ads Management", 
    prices: { INR: 7999, USD: 399, AUD: 599, EUR: 369, GBP: 319 },
    category: "Growth Systems", 
    icon: "TrendingUp" 
  },
  { 
    id: "meta-ads", 
    name: "Meta Ads Management", 
    prices: { INR: 7999, USD: 399, AUD: 599, EUR: 369, GBP: 319 },
    category: "Growth Systems", 
    icon: "Share2" 
  },
  { 
    id: "social-media", 
    name: "Social Media Content", 
    prices: { INR: 5999, USD: 249, AUD: 369, EUR: 229, GBP: 199 },
    category: "Growth Systems", 
    icon: "Camera" 
  },
  { 
    id: "conversion-opt", 
    name: "Conversion Optimization", 
    prices: { INR: 3999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "Growth Systems", 
    icon: "Target" 
  },

  // Business Operations
  { 
    id: "crm-dashboard", 
    name: "CRM Dashboard", 
    prices: { INR: 4999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "Business Operations", 
    icon: "Database" 
  },
  { 
    id: "appointment-booking", 
    name: "Appointment Booking System", 
    prices: { INR: 1999, USD: 79, AUD: 119, EUR: 69, GBP: 59 },
    category: "Business Operations", 
    icon: "Calendar" 
  },
  { 
    id: "email-automation", 
    name: "Email Automation", 
    prices: { INR: 2999, USD: 99, AUD: 149, EUR: 89, GBP: 79 },
    category: "Business Operations", 
    icon: "Mail" 
  },
  { 
    id: "workflow-automation", 
    name: "Workflow Automation", 
    prices: { INR: 4999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "Business Operations", 
    icon: "Repeat" 
  },
  { 
    id: "customer-portal", 
    name: "Customer Management Portal", 
    prices: { INR: 5999, USD: 249, AUD: 369, EUR: 229, GBP: 199 },
    category: "Business Operations", 
    icon: "Users" 
  },
];
