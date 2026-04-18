import { motion } from "motion/react";
import { RefreshCcw, Wifi, Box, BrainCircuit, Activity, ShieldCheck, Fuel } from "lucide-react";

export default function InnovationLoop() {
  const steps = [
    {
      step: "01",
      name: "Ingest",
      desc: "Streams high-velocity telemetry, traffic, and behavioral data.",
      icon: Wifi,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      step: "02",
      name: "Simulate",
      desc: "Models the network as a Markov Decision Process (MDP).",
      icon: RefreshCcw,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      step: "03",
      name: "Optimize",
      desc: "Applies Reinforcement Learning (PPO/DQN) to solve noise.",
      icon: BrainCircuit,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      step: "04",
      name: "Act",
      desc: "Triggers autonomous agentic execution and alerts.",
      icon: Activity,
      color: "text-accent-blue",
      bg: "bg-blue-100"
    }
  ];

  const outcomes = [
    {
      icon: Fuel,
      title: "Routing Efficiency",
      value: "12%",
      desc: "Reduction in fuel consumption in volatile urban traffic.",
      label: "Reduction"
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      value: "82%",
      desc: "Decrease in cargo theft via behavioral AI interpretation.",
      label: "Reduction"
    }
  ];

  return (
    <section className="section-padding bg-bento-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="bento-badge mb-4">Core Innovation</div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
               The Agentic <span className="text-bento-accent text-glow">Action Loop</span>
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
               {steps.map((s, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="bento-card bg-bento-card border border-bento-border group hover:border-bento-accent transition-all"
                 >
                    <div className="flex justify-between items-start mb-6">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{s.step}</span>
                       <div className="w-12 h-12 rounded-xl bg-bento-bg border border-bento-border text-bento-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                          <s.icon className="w-6 h-6" />
                       </div>
                    </div>
                    <h3 className="text-lg font-black mb-2 uppercase tracking-tight">{s.name}</h3>
                    <p className="text-xs font-medium text-bento-muted leading-relaxed">{s.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>

          <div className="relative">
             <div className="p-12 rounded-[48px] bg-bento-card text-white border border-bento-border shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 data-grid opacity-5" />
                <div className="relative z-10">
                   <div className="text-center mb-12">
                      <div className="bento-badge mb-4">Proven IP Outcomes</div>
                      <div className="text-3xl font-black uppercase tracking-tighter">Performance Benchmarks</div>
                   </div>

                   <div className="space-y-8">
                      {outcomes.map((o, i) => (
                        <div key={i} className="flex gap-6 items-center">
                           <div className="w-16 h-16 rounded-2xl bg-bento-bg border border-bento-border flex items-center justify-center shrink-0">
                              <o.icon className="w-8 h-8 text-bento-accent" />
                           </div>
                           <div className="flex-1">
                              <div className="flex items-baseline justify-between mb-2">
                                 <h4 className="text-sm font-black uppercase tracking-widest">{o.title}</h4>
                                 <div className="text-3xl font-black text-white">{o.value}</div>
                              </div>
                              <div className="h-1.5 w-full bg-bento-bg rounded-full overflow-hidden border border-bento-border">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   whileInView={{ width: o.value }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 1, delay: 0.5 }}
                                   className="h-full bg-bento-accent shadow-[0_0_10px_#00F0FF]"
                                 />
                              </div>
                              <div className="mt-2 text-[10px] font-bold text-bento-muted italic uppercase tracking-widest">{o.desc}</div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="mt-12 pt-12 border-t border-bento-border flex items-center justify-center gap-6">
                      <div className="flex -space-x-4">
                         {[1,2,3,4].map((i) => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-bento-bg bg-bento-card overflow-hidden">
                              <img src={`https://picsum.photos/seed/user-bento-${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                           </div>
                         ))}
                      </div>
                      <div className="text-[10px] font-black text-bento-muted uppercase tracking-[0.2em] leading-none">
                         Joined by 450+ Enterprise Shippers
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
