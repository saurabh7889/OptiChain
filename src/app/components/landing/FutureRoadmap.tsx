import { motion } from "motion/react";
import { ChevronRight, ArrowUpRight, Cpu, Bot, Waypoints } from "lucide-react";

export default function FutureRoadmap() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Task Automation",
      status: "Current",
      desc: "Real-time prescriptive alerts and basic task automation across siloed datasets.",
      icon: Cpu,
      color: "bg-slate-200"
    },
    {
      phase: "Phase 2",
      title: "Human-on-the-Loop",
      status: "Near-Term",
      desc: "Agentic Supply Chains. RAG Agents and Autonomous Orchestrators dynamically re-route shipments based on global disruptions.",
      icon: Bot,
      color: "bg-blue-100"
    },
    {
      phase: "Phase 3",
      title: "Physical AI Integration",
      status: "Vision",
      desc: "OptiChain as the central Operating System for Robotic Automation (AGVs/AMRs). Achieving fully self-healing, autonomous global supply chains.",
      icon: Waypoints,
      color: "bg-accent-blue text-white"
    }
  ];

  return (
    <section id="future" className="section-padding bg-bento-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-5" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
           <div className="bento-badge mb-4">Evolution Path</div>
           <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
              Autonomous <br />
              <span className="text-bento-accent">Orchestration</span>
           </h2>
           <p className="text-lg text-bento-muted font-medium max-w-2xl mx-auto uppercase tracking-widest text-[11px]">
              We are building the orchestration layer for the future of global trade.
           </p>
        </div>

        <div className="relative">
           {/* Timeline Line */}
           <div className="absolute top-0 bottom-0 left-1/2 -ml-px border-l border-bento-border hidden lg:block" />

           <div className="space-y-20 lg:space-y-40 relative">
              {phases.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                >
                   {/* Card */}
                   <div className="lg:w-1/2 w-full">
                      <div className="bento-card bg-bento-card border border-bento-border group hover:border-bento-accent transition-all duration-500 shadow-2xl">
                         <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{p.phase}</span>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bento-bg border border-bento-border text-[9px] font-black uppercase tracking-widest text-bento-muted">
                               <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'Current' ? 'bg-green-500' : 'bg-bento-accent animate-pulse shadow-[0_0_5px_#00F0FF]'}`} />
                               {p.status}
                            </div>
                         </div>
                         
                         <h3 className="text-3xl font-black text-white mb-6 group-hover:text-bento-accent transition-colors tracking-tight leading-none uppercase">
                            {p.title}
                         </h3>
                         <p className="text-bento-muted font-medium text-sm leading-relaxed border-l-2 border-bento-accent/20 pl-6 mb-8 italic">
                            {p.desc}
                         </p>

                         <div className="flex justify-end">
                            <div className="w-10 h-10 rounded-xl bg-bento-bg border border-bento-border flex items-center justify-center group-hover:bg-bento-accent group-hover:text-black transition-all duration-300">
                               <ArrowUpRight className="w-5 h-5" />
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Marker */}
                   <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-bento-bg border-4 border-bento-card shadow-2xl flex items-center justify-center text-bento-accent">
                         <p.icon className="w-8 h-8" />
                      </div>
                      <div className="lg:hidden h-20 w-[1px] bg-bento-border mt-4" />
                   </div>

                   <div className="lg:w-1/2" />
                </motion.div>
              ))}
           </div>
        </div>

        <div className="mt-40 text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bento-card !bg-gradient-to-br from-bento-accent/10 to-transparent border border-bento-accent/20 p-20 rounded-[64px] shadow-2xl overflow-hidden relative"
           >
              <div className="absolute inset-0 data-grid opacity-5 pointer-events-none" />
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                 Ready to <span className="text-bento-accent">Partner?</span>
              </h3>
              <button className="bg-bento-accent text-black px-12 py-6 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(0,240,255,0.3)]">
                 Partner with OptiChain
                 <ChevronRight className="w-6 h-6" />
              </button>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
