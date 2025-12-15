import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import iphoneMockup from "@/assets/iphone-mockup.png";
import { useLanguage } from "@/contexts/LanguageContext";

const avatars = [
  { id: 1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 2, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { id: 3, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 4, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
];

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="gradient-text-hero">{t.hero.title1}</span>
              <br />
              <span className="text-foreground">{t.hero.title2}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gold text-gold-foreground font-bold rounded-xl glow-gold hover:brightness-110 transition-all"
              >
                {t.hero.trialButton}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-border bg-secondary/50 text-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all"
              >
                <Apple className="w-5 h-5" />
                {t.hero.appStoreButton}
              </motion.button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {avatars.map((avatar, i) => (
                  <motion.div
                    key={avatar.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <img
                      src={avatar.image}
                      alt={`Trader ${avatar.id}`}
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-foreground font-semibold">24,500+</span>
                <span className="text-muted-foreground"> {t.hero.socialProof}</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Floating iPhone */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
          >
            <div className="relative float-animation" style={{ perspective: "1000px" }}>
              <motion.div
                animate={{ rotateY: [-3, 3, -3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={iphoneMockup}
                  alt="CryptoLens App"
                  className="w-80 md:w-[400px] lg:w-[480px] xl:w-[520px] drop-shadow-2xl"
                />
              </motion.div>
              
              {/* Enhanced Glow Effect */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-accent/20 to-transparent blur-3xl -z-10 scale-110" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
