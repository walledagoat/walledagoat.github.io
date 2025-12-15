import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="CryptoLens Logo" className="w-8 h-8 invert" />
          <span className="text-xl font-bold text-foreground">CryptoLens</span>
        </div>

        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={(val) => setLanguage(val as "en" | "da")}>
            <SelectTrigger className="w-auto gap-2 bg-transparent border-border/50 hover:border-border transition-colors">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="da">Dansk</SelectItem>
            </SelectContent>
          </Select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-2.5 bg-gold text-gold-foreground font-semibold rounded-full overflow-hidden group"
          >
            <span className="relative z-10">{t.nav.download}</span>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              className="absolute inset-0 shimmer"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
