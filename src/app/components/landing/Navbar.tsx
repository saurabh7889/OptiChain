import { motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-bento-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-bento-card border border-bento-border rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-bento-accent rounded-full animate-pulse shadow-[0_0_10px_#00F0FF]" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">OptiChain</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Problem", "Solution", "Technology", "ROI", "Future"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[12px] uppercase tracking-widest font-bold text-bento-muted hover:text-bento-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="bg-bento-accent text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel border-b border-bento-border absolute top-20 left-0 right-0 p-6 flex flex-col gap-4 text-center"
        >
          {["Problem", "Solution", "Technology", "ROI", "Future"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-black uppercase tracking-[0.2em] text-white py-2"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="bg-bento-accent text-black w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest block"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
