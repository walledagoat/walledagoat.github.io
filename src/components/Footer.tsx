import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="CryptoLens" className="w-6 h-6 invert" />
            <span className="font-bold text-foreground">CryptoLens</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <motion.a
              whileHover={{ color: "hsl(var(--foreground))" }}
              href="#"
              className="hover:text-foreground transition-colors"
            >
              {t.footer.privacy}
            </motion.a>
            <motion.a
              whileHover={{ color: "hsl(var(--foreground))" }}
              href="#"
              className="hover:text-foreground transition-colors"
            >
              {t.footer.terms}
            </motion.a>
            <motion.a
              whileHover={{ color: "hsl(var(--foreground))" }}
              href="#"
              className="hover:text-foreground transition-colors"
            >
              {t.footer.support}
            </motion.a>
          </div>

          <p className="text-sm text-muted-foreground text-center md:text-right">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
