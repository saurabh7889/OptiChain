import { motion } from "motion/react";
import { Layers, Database, Cpu, Share2, CheckCircle2, XCircle } from "lucide-react";

export default function IntelligenceLayer() {
  const comparison = [
    {
      dimension: "Data Model",
      legacy: "Milestone-based (Batch)",
      optichain: "Streaming IoT (Real-Time)",
      isGood: true
    },
    {
      dimension: "Core Question",
      legacy: "Where is my order?",
      optichain: "What will happen next?",
      isGood: true
    },
    {
      dimension: "Response",
      legacy: "Reactive / Human-dependent",
      optichain: "Predictive / Autonomous",
      isGood: true
    },
    {
      dimension: "Visibility",
      legacy: "Siloed / Fragmented",
      optichain: "Unified Digital Twin",
      isGood: true
    }
  ];

  return (
    <section id="solution" className="section-padding bg-bento-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
           <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              The Intelligence Layer: <br />
              <span className="text-bento-accent">Predictive Autonomy</span>
           </h2>
           <p className="text-lg text-bento-muted font-medium">
              OptiChain sits on top of your existing tech stack, acting as the central nervous system orchestrating global trade.
           </p>
        </div>

        {/* Intelligence Layer Visualization */}
        <div className="relative p-12 rounded-[48px] bg-bento-card overflow-hidden mb-24 border border-bento-border shadow-2xl">
           <div className="absolute inset-0 data-grid opacity-5" />
           <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
              
              {/* Sources */}
              <div className="space-y-4">
                 {[
                   { icon: Database, name: "ERP Systems", desc: "SAP / Dynamics 365" },
                   { icon: Layers, name: "Warehouse MS", desc: "Real-time Inventory" },
                   { icon: Share2, name: "Telematics", desc: "IoT Fleet Tracking" }
                 ].map((s, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-bento-bg border border-bento-border flex items-center gap-4 group hover:border-bento-accent transition-colors">
                       <div className="p-3 bg-bento-card rounded-xl text-bento-muted group-hover:text-bento-accent transition-colors">
                          <s.icon className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-xs font-black text-white uppercase tracking-widest leading-none mb-1">{s.name}</div>
                          <div className="text-[10px] font-bold text-bento-muted uppercase tracking-widest">{s.desc}</div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Central Intelligence */}
              <div className="relative flex flex-col items-center py-12">
                 <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="relative w-40 h-40 bg-bento-bg border border-bento-accent/30 rounded-3xl flex items-center justify-center p-8 shadow-[0_0_50px_rgba(0,240,255,0.1)] z-10"
                 >
                    <div className="absolute inset-0 bg-bento-accent/5 blur-2xl rounded-full" />
                    <Cpu className="w-full h-full text-bento-accent" />
                 </motion.div>
                 
                 <div className="mt-8 text-center">
                    <div className="text-md font-black text-white uppercase tracking-[0.4em] mb-1">Opti-Kernel</div>
                    <div className="text-[10px] font-bold text-bento-accent uppercase tracking-widest leading-none underline decoration-bento-accent/20 decoration-2">Vizzard AI Core</div>
                 </div>
              </div>

              {/* Output/Digital Twin */}
              <div className="bg-bento-bg p-8 rounded-[32px] border border-bento-border shadow-2xl">
                 <div className="text-[10px] font-black text-bento-accent uppercase tracking-[0.4em] mb-6">Unified Digital Twin</div>
                 <div className="space-y-6">
                    {[1,2,3].map((i) => (
                      <div key={i} className="flex gap-4">
                         <div className="w-6 h-10 bg-white/5 rounded-lg flex-shrink-0 relative overflow-hidden border border-white/5">
                            <motion.div 
                              animate={{ y: ["100%", "-100%"] }}
                              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                              className="absolute inset-0 bg-bento-accent/20"
                            />
                         </div>
                         <div className="flex-1 space-y-2">
                            <div className="h-1.5 w-full bg-white/5 rounded-full" />
                            <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-[40px] border border-bento-border shadow-2xl">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-bento-card text-white">
                    <th className="p-8 text-xs font-black uppercase tracking-[0.3em]">Dimension</th>
                    <th className="p-8 text-xs font-black uppercase tracking-[0.3em] border-l border-bento-border">Legacy systems</th>
                    <th className="p-8 text-xs font-black uppercase tracking-[0.3em] bg-bento-accent text-black">OptiChain Intelligence</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-bento-border bg-bento-bg">
                 {comparison.map((row, i) => (
                   <tr key={i} className="group hover:bg-white/5 transition-colors">
                      <td className="p-8 font-black text-bento-muted uppercase text-[10px] tracking-widest">{row.dimension}</td>
                      <td className="p-8">
                         <div className="flex items-center gap-3">
                            <XCircle className="w-5 h-5 text-white/20 shrink-0" />
                            <span className="text-bento-muted font-medium text-sm">{row.legacy}</span>
                         </div>
                      </td>
                      <td className="p-8 bg-bento-accent/5">
                         <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-bento-accent shrink-0" />
                            <span className="text-white font-black text-sm uppercase tracking-tight">{row.optichain}</span>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </section>
  );
}
