
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
  "Core OS Infrastructure",
  "AI Intelligence",
  "Growth Engine",
  "Business Automation"
];

export const PRICING_SERVICES: ServiceItem[] = [
  // Core OS Infrastructure
  { 
    id: "os-foundation", 
    name: "AI OS Foundation", 
    prices: { INR: 4999, USD: 149, AUD: 219, EUR: 139, GBP: 119 },
    category: "Core OS Infrastructure", 
    icon: "Cpu" 
  },
  { 
    id: "premium-web-interface", 
    name: "Premium Web Interface", 
    prices: { INR: 2999, USD: 99, AUD: 149, EUR: 89, GBP: 79 },
    category: "Core OS Infrastructure", 
    icon: "Globe" 
  },
  { 
    id: "secure-cloud-hosting", 
    name: "Secure Cloud Hosting", 
    prices: { INR: 999, USD: 49, AUD: 69, EUR: 45, GBP: 39 },
    category: "Core OS Infrastructure", 
    icon: "ShieldCheck" 
  },
  { 
    id: "os-maintenance", 
    name: "System Maintenance", 
    prices: { INR: 1499, USD: 59, AUD: 89, EUR: 55, GBP: 49 },
    category: "Core OS Infrastructure", 
    icon: "Settings" 
  },
  { 
    id: "unified-dashboard", 
    name: "Unified OS Dashboard", 
    prices: { INR: 1999, USD: 99, AUD: 149, EUR: 89, GBP: 79 },
    category: "Core OS Infrastructure", 
    icon: "BarChart3" 
  },

  // AI Intelligence
  { 
    id: "ai-business-assistant", 
    name: "24/7 AI Assistant", 
    prices: { INR: 2999, USD: 129, AUD: 189, EUR: 119, GBP: 99 },
    category: "AI Intelligence", 
    icon: "Bot" 
  },
  { 
    id: "whatsapp-ai-agent", 
    name: "WhatsApp AI Agent", 
    prices: { INR: 3999, USD: 149, AUD: 219, EUR: 139, GBP: 119 },
    category: "AI Intelligence", 
    icon: "MessageSquareText" 
  },
  { 
    id: "voice-ai-integration", 
    name: "Voice AI Integration", 
    prices: { INR: 5999, USD: 249, AUD: 369, EUR: 229, GBP: 199 },
    category: "AI Intelligence", 
    icon: "Mic" 
  },
  { 
    id: "ai-content-generator", 
    name: "AI Content Engine", 
    prices: { INR: 4999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "AI Intelligence", 
    icon: "PenTool" 
  },
  { 
    id: "predictive-analytics", 
    name: "Predictive Analytics", 
    prices: { INR: 3999, USD: 159, AUD: 239, EUR: 149, GBP: 129 },
    category: "AI Intelligence", 
    icon: "Zap" 
  },

  // Growth Engine
  { 
    id: "ai-lead-capture", 
    name: "AI Lead Capture System", 
    prices: { INR: 3999, USD: 149, AUD: 219, EUR: 139, GBP: 119 },
    category: "Growth Engine", 
    icon: "UserPlus" 
  },
  { 
    id: "seo-growth-os", 
    name: "AEO/SEO Growth Pack", 
    prices: { INR: 5999, USD: 299, AUD: 449, EUR: 279, GBP: 239 },
    category: "Growth Engine", 
    icon: "Search" 
  },
  { 
    id: "ad-campaign-manager", 
    name: "AI Ads Manager", 
    prices: { INR: 7999, USD: 349, AUD: 519, EUR: 319, GBP: 279 },
    category: "Growth Engine", 
    icon: "TrendingUp" 
  },
  { 
    id: "social-automation", 
    name: "Social Growth Auto", 
    prices: { INR: 4999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "Growth Engine", 
    icon: "Share2" 
  },
  { 
    id: "conversion-optimizer", 
    name: "Conversion Engine", 
    prices: { INR: 2999, USD: 129, AUD: 189, EUR: 119, GBP: 99 },
    category: "Growth Engine", 
    icon: "Target" 
  },

  // Business Automation
  { 
    id: "crm-os-module", 
    name: "AI CRM Module", 
    prices: { INR: 3999, USD: 159, AUD: 239, EUR: 149, GBP: 129 },
    category: "Business Automation", 
    icon: "Database" 
  },
  { 
    id: "appointment-automation", 
    name: "Auto-Booking System", 
    prices: { INR: 1999, USD: 89, AUD: 129, EUR: 79, GBP: 69 },
    category: "Business Automation", 
    icon: "Calendar" 
  },
  { 
    id: "workflow-engine", 
    name: "Custom Workflow Engine", 
    prices: { INR: 4999, USD: 199, AUD: 299, EUR: 179, GBP: 159 },
    category: "Business Automation", 
    icon: "Repeat" 
  },
  { 
    id: "email-marketing-os", 
    name: "AI Email Marketing", 
    prices: { INR: 2999, USD: 129, AUD: 189, EUR: 119, GBP: 99 },
    category: "Business Automation", 
    icon: "Mail" 
  },
  { 
    id: "client-portal-os", 
    name: "Client Management OS", 
    prices: { INR: 5999, USD: 249, AUD: 369, EUR: 229, GBP: 199 },
    category: "Business Automation", 
    icon: "Users" 
  },
];
