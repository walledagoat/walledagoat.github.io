import { motion } from "framer-motion";
import { Check, X, Zap, Bell, Award, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const proIcons = [Sparkles, Zap, Bell, Check, Award, Check];

  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.pricing.title} <span className="gradient-text-gold">Pro</span> Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t.pricing.subtitle}
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              {t.pricing.monthly}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 rounded-full bg-secondary border border-border transition-colors"
            >
              <motion.div
                className="absolute top-1 w-6 h-6 rounded-full bg-gold"
                animate={{ left: isYearly ? "calc(100% - 28px)" : "4px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              {t.pricing.yearly}
              <span className="ml-2 px-2 py-1 text-xs bg-success/20 text-success rounded-full">
                {t.pricing.save}
              </span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 opacity-75"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{t.pricing.free}</h3>
              <p className="text-muted-foreground">{t.pricing.freeDesc}</p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/{t.pricing.monthly.toLowerCase()}</span>
            </div>

            <ul className="space-y-4 mb-8">
              {t.pricing.freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {index < 3 ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className={index < 3 ? "" : "text-muted-foreground line-through"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-xl border border-border text-muted-foreground font-semibold hover:bg-secondary transition-colors">
              {t.pricing.currentPlan}
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative glass-card-strong p-8 border-2 border-gold/50 glow-gold"
          >
            {/* Pro Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-gold-foreground font-bold rounded-full text-sm">
              {t.pricing.mostPopular}
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 gradient-text-gold">{t.pricing.pro}</h3>
              <p className="text-muted-foreground">{t.pricing.proDesc}</p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold">${isYearly ? "7.99" : "9.99"}</span>
              <span className="text-muted-foreground">/{t.pricing.monthly.toLowerCase()}</span>
              {isYearly && (
                <p className="text-sm text-success mt-1">{t.pricing.billedAnnually} (${(7.99 * 12).toFixed(0)}/year)</p>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {t.pricing.proFeatures.map((feature, index) => {
                const Icon = proIcons[index];
                return (
                  <li key={index} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gold" />
                    <span className="font-medium">{feature}</span>
                  </li>
                );
              })}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gold text-gold-foreground font-bold pulse-glow hover:brightness-110 transition-all"
            >
              {t.pricing.startTrial}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
