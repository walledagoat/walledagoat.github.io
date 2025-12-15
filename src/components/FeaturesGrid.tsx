import { motion } from "framer-motion";
import { Brain, Shield, Bell, TrendingUp } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AIChart = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setIsVisible(true), 300);
    }
  }, [inView]);

  return (
    <div ref={ref} className="h-40 relative">
      <svg className="w-full h-full" viewBox="0 0 300 120">
        {/* Actual Price Line */}
        <motion.path
          d="M 0 80 Q 50 70, 100 60 T 200 40 T 280 50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Predicted Price Line */}
        <motion.path
          d="M 200 40 Q 220 35, 240 25 T 300 15"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 left-0 flex gap-4 text-xs">
        <span className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-primary" /> {t.features.actual}
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-accent border-dashed" /> {t.features.predicted}
        </span>
      </div>
    </div>
  );
};

const FeaturesGrid = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t.features.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Predictor - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 glass-card p-8 group hover:glow-accent transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-accent/20 text-accent">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">{t.features.aiPredictor}</h3>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-accent text-accent-foreground">
                {t.features.confidence}
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {t.features.aiPredictorDesc}
            </p>
            <AIChart />
          </motion.div>

          {/* Verified News */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 group hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-success/20 text-success">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{t.features.verifiedNews}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">{t.features.verifiedNewsDesc}</p>
            <div className="space-y-3">
              {["CoinDesk", "Bloomberg", "Decrypt"].map((source) => (
                <div key={source} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                    {source[0]}
                  </div>
                  <span className="font-medium">{source}</span>
                  <Shield className="w-4 h-4 text-success ml-auto" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Whale Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 group hover:border-warning/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-warning/20 text-warning">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{t.features.whaleAlerts}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">{t.features.whaleAlertsDesc}</p>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="p-4 rounded-xl bg-secondary border border-border shadow-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">CryptoLens Alert</span>
                <span className="text-xs text-muted-foreground">now</span>
              </div>
              <p className="font-medium">{t.features.whaleNotification}</p>
            </motion.div>
          </motion.div>

          {/* Market Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6 group hover:border-success/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/20 text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{t.features.marketStats}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t.features.topGainers}</p>
                <div className="space-y-2">
                  {[
                    { symbol: "SOL", change: "+12.4%" },
                    { symbol: "AVAX", change: "+8.2%" },
                  ].map((coin) => (
                    <div key={coin.symbol} className="flex justify-between items-center p-2 rounded-lg bg-success/10">
                      <span className="font-medium">{coin.symbol}</span>
                      <span className="text-success font-bold">{coin.change}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t.features.topLosers}</p>
                <div className="space-y-2">
                  {[
                    { symbol: "DOGE", change: "-5.1%" },
                    { symbol: "SHIB", change: "-3.8%" },
                  ].map((coin) => (
                    <div key={coin.symbol} className="flex justify-between items-center p-2 rounded-lg bg-destructive/10">
                      <span className="font-medium">{coin.symbol}</span>
                      <span className="text-destructive font-bold">{coin.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
