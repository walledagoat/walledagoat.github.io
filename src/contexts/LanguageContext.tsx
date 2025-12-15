import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "da";

interface Translations {
  nav: {
    download: string;
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    trialButton: string;
    appStoreButton: string;
    socialProof: string;
  };
  features: {
    title: string;
    subtitle: string;
    aiPredictor: string;
    aiPredictorDesc: string;
    confidence: string;
    actual: string;
    predicted: string;
    verifiedNews: string;
    verifiedNewsDesc: string;
    whaleAlerts: string;
    whaleAlertsDesc: string;
    whaleNotification: string;
    marketStats: string;
    topGainers: string;
    topLosers: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    save: string;
    free: string;
    freeDesc: string;
    currentPlan: string;
    pro: string;
    proDesc: string;
    mostPopular: string;
    startTrial: string;
    billedAnnually: string;
    freeFeatures: string[];
    proFeatures: string[];
  };
  footer: {
    privacy: string;
    terms: string;
    support: string;
    tagline: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      download: "Download",
    },
    hero: {
      title1: "See The Market",
      title2: "Clearly.",
      subtitle: "The only crypto tracker with verified news sources and proprietary AI price predictions.",
      trialButton: "Start 7-Day Free Trial",
      appStoreButton: "Download on App Store",
      socialProof: "Traders Trust CryptoLens",
    },
    features: {
      title: "Powerful Features",
      subtitle: "Everything you need to stay ahead of the market",
      aiPredictor: "The AI Predictor",
      aiPredictorDesc: "Proprietary machine learning models forecast price movements with high accuracy.",
      confidence: "87% Confidence",
      actual: "Actual",
      predicted: "Predicted",
      verifiedNews: "Verified News",
      verifiedNewsDesc: "Zero Noise. Only Verified Sources.",
      whaleAlerts: "Whale Alerts",
      whaleAlertsDesc: "Real-time notifications for major movements.",
      whaleNotification: "🚨 500 BTC moved to Binance",
      marketStats: "Market Stats",
      topGainers: "Top Gainers 🚀",
      topLosers: "Top Losers 🔻",
    },
    pricing: {
      title: "The",
      subtitle: "Unlock the full power of CryptoLens",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "Save 20%",
      free: "Free",
      freeDesc: "Get started with the basics",
      currentPlan: "Current Plan",
      pro: "Pro",
      proDesc: "Everything you need to trade smarter",
      mostPopular: "MOST POPULAR",
      startTrial: "Start 7-Day Free Trial",
      billedAnnually: "Billed annually",
      freeFeatures: [
        "Track up to 10 coins",
        "Basic price alerts",
        "Daily market summary",
        "AI Predictions",
        "Whale Alerts",
        "Ad-free experience",
      ],
      proFeatures: [
        "Unlimited coin tracking",
        "Unlimited AI Forecasts",
        "Real-time Whale Signals",
        "Ad-Free Experience",
        "Exclusive 'PRO' Profile Badge",
        "Priority customer support",
      ],
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      support: "Support",
      tagline: "Made for Traders, by Traders.",
    },
  },
  da: {
    nav: {
      download: "Download",
    },
    hero: {
      title1: "Se Markedet",
      title2: "Klart.",
      subtitle: "Den eneste krypto-tracker med verificerede nyhedskilder og proprietære AI-prisforudsigelser.",
      trialButton: "Start 7-dages gratis prøveperiode",
      appStoreButton: "Download på App Store",
      socialProof: "Tradere stoler på CryptoLens",
    },
    features: {
      title: "Kraftfulde Funktioner",
      subtitle: "Alt hvad du behøver for at være foran markedet",
      aiPredictor: "AI Forudsigeren",
      aiPredictorDesc: "Proprietære maskinlæringsmodeller forudsiger prisbevægelser med høj nøjagtighed.",
      confidence: "87% Sikkerhed",
      actual: "Faktisk",
      predicted: "Forudsagt",
      verifiedNews: "Verificerede Nyheder",
      verifiedNewsDesc: "Ingen Støj. Kun Verificerede Kilder.",
      whaleAlerts: "Hval-Advarsler",
      whaleAlertsDesc: "Realtidsnotifikationer for større bevægelser.",
      whaleNotification: "🚨 500 BTC flyttet til Binance",
      marketStats: "Markedsstatistik",
      topGainers: "Største Stigninger 🚀",
      topLosers: "Største Fald 🔻",
    },
    pricing: {
      title: "Den",
      subtitle: "Lås op for den fulde kraft af CryptoLens",
      monthly: "Månedlig",
      yearly: "Årlig",
      save: "Spar 20%",
      free: "Gratis",
      freeDesc: "Kom i gang med det basale",
      currentPlan: "Nuværende Plan",
      pro: "Pro",
      proDesc: "Alt hvad du behøver for at handle smartere",
      mostPopular: "MEST POPULÆR",
      startTrial: "Start 7-dages gratis prøveperiode",
      billedAnnually: "Faktureres årligt",
      freeFeatures: [
        "Følg op til 10 kryptovalutaer",
        "Basale prisadvarsler",
        "Daglig markedsoversigt",
        "AI Forudsigelser",
        "Hval-Advarsler",
        "Reklamefri oplevelse",
      ],
      proFeatures: [
        "Ubegrænset kryptovalutasporing",
        "Ubegrænsede AI-Forudsigelser",
        "Realtids Hval-Signaler",
        "Reklamefri Oplevelse",
        "Eksklusivt 'PRO' Profil Badge",
        "Prioriteret kundesupport",
      ],
    },
    footer: {
      privacy: "Privatlivspolitik",
      terms: "Servicevilkår",
      support: "Support",
      tagline: "Lavet for Tradere, af Tradere.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
