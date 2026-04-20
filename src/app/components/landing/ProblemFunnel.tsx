import { motion } from "motion/react";
import { AlertTriangle, TrendingDown, ShieldAlert, PackageSearch } from "lucide-react";

export default function ProblemFunnel() {
  const problems = [
    {
      icon: TrendingDown,
      title: "Warehousing Decay",
      value: "$1.5 Trillion",
      desc: "Annual global loss due to fragmented inventory management.",
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      icon: ShieldAlert,
      title: "Freight Fraud & Theft",
      value: "1.11%",
      desc: "Of all shipments compromised, costing average enterprise $9.9M annually.",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: PackageSearch,
      title: "Asset Underutilization",
      value: "Billions",
      desc: "Lost to dead air and empty miles in global transportation networks.",
      color: "text-amber-500",
      bg: "bg-amber-50"
    }
  ];

  return (
    <section id="problem" className="section-padding bg-bento-bg text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-bento-border" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            The <span className="text-bento-accent">$1.5 Trillion Decay</span>
          </h2>
          <p className="text-xl text-bento-muted mb-12 font-medium">
            The logistics industry suffers from the <span className="text-white font-bold italic underline decoration-bento-accent decoration-2">Intelligence Gap</span>—the delay between physical events and system actions.
          </p>

          <div className="space-y-4">
            {problems.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card flex gap-6 group hover:translate-x-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-bento-bg border border-bento-border flex items-center justify-center shrink-0 group-hover:border-bento-accent transition-colors">
                   <p.icon className="w-8 h-8 text-bento-accent" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">{p.title}</h3>
                    <span className="text-xs font-black text-bento-accent tracking-widest">{p.value}</span>
                  </div>
                  <p className="text-sm font-medium text-bento-muted leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-bento-card border-l-4 border-bento-accent flex items-center gap-4">
             <p className="text-xs font-black tracking-widest uppercase text-white leading-relaxed">
                Passive milestone tracking is no longer economically viable in a high-volatility market.
             </p>
          </div>
        </div>

        <div className="relative">
           {/* Visual Funnel Representation */}
           <div className="relative flex flex-col items-center gap-4">
              {[
                { w: "w-full", h: "h-24", label: "Event Trigger", opacity: "opacity-100" },
                { w: "w-[80%]", h: "h-20", label: "Detection Lag", opacity: "opacity-80" },
                { w: "w-[60%]", h: "h-16", label: "Analysis Delay", opacity: "opacity-60" },
                { w: "w-[40%]", h: "h-12", label: "Reactive Action", opacity: "opacity-40" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: Number(step.opacity.split('-')[1])/100, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${step.w} ${step.h} rounded-2xl bg-bento-card border border-bento-border flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-white relative`}
                >
                   {step.label}
                   {i < 3 && (
                     <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-bento-border" />
                   )}
                </motion.div>
              ))}
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 border border-bento-accent/10 rounded-full animate-ping" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
