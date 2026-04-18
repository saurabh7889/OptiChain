import { motion } from "motion/react";
import { Cloud, Server, Cpu, Database, Network } from "lucide-react";

export default function ArchitectureDiagram() {
  return (
    <section className="section-padding bg-bento-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              Architecture of <span className="text-bento-accent">Trust</span>
           </h2>
           <p className="text-lg text-bento-muted font-medium mb-12">
              A sovereign intelligence layer that bridges physical reality with digital orchestration.
           </p>
           <div className="bento-badge px-8 py-3 bg-bento-accent text-black font-black uppercase text-sm">
              The Unfair Advantage: Predictability
           </div>
        </div>

        <div className="relative p-12 lg:p-20 rounded-[48px] bg-bento-card border border-bento-border shadow-2xl overflow-hidden">
           <div className="absolute inset-0 data-grid opacity-5 pointer-events-none" />
           
           <div className="grid lg:grid-cols-3 gap-16 items-center relative z-10">
              {/* Layer 1: Ingestion */}
              <div className="space-y-8">
                 <div className="flex flex-col items-center text-center p-10 rounded-[32px] bg-bento-bg border border-bento-border group hover:border-bento-accent transition-colors">
                    <Database className="w-12 h-12 text-bento-muted group-hover:text-bento-accent transition-colors mb-6" />
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Data Ingestion</h3>
                    <p className="text-[10px] font-bold text-bento-muted mt-2 uppercase tracking-[0.2em]">Edge/IoT Sensors, ERP Integrations</p>
                 </div>
                 
                 <div className="flex flex-col gap-4">
                    {[1,2,3].map((i) => (
                       <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-bento-accent animate-pulse shadow-[0_0_8px_#00F0FF]" />
                          <div className="h-[1px] flex-1 bg-bento-border rounded-full" />
                       </div>
                    ))}
                 </div>
              </div>

              {/* Layer 2: Processing */}
              <div className="relative">
                 <div className="p-10 rounded-[40px] bg-bento-bg text-white shadow-2xl relative overflow-hidden border border-bento-border">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Cloud className="w-32 h-32" />
                    </div>
                    
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-bento-card border border-bento-border flex items-center justify-center">
                             <Network className="w-6 h-6 text-bento-accent" />
                          </div>
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest text-bento-accent mb-1 underline decoration-bento-accent/20 decoration-2">Azure IoT Hub</div>
                             <div className="text-sm font-black uppercase tracking-tight">Edge Computing</div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-bento-card border border-bento-border flex items-center justify-center">
                             <Database className="w-6 h-6 text-white/40" />
                          </div>
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-1">BigQuery Engine</div>
                             <div className="text-sm font-black uppercase tracking-tight">Scale Analytics</div>
                          </div>
                       </div>

                       <div className="pt-8 border-t border-bento-border">
                          <div className="text-center font-black uppercase tracking-[0.3em] text-[10px] text-bento-muted">Processing Kernel</div>
                       </div>
                    </div>
                 </div>

                 {/* Lateral lines representing flow */}
                 <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-bento-border hidden lg:block" />
                 <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-bento-border hidden lg:block" />
              </div>

              {/* Layer 3: Intelligence Engine */}
              <div className="flex flex-col items-center">
                 <motion.div 
                   animate={{ 
                     boxShadow: ["0 0 20px rgba(0,240,255,0.05)", "0 0 50px rgba(0,240,255,0.2)", "0 0 20px rgba(0,240,255,0.05)"] 
                   }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="w-full aspect-square bg-bento-bg rounded-[40px] flex flex-col items-center justify-center p-12 text-center text-white relative border border-bento-accent/30"
                 >
                    <div className="absolute -top-4 bg-bento-accent px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-black shadow-lg">Vizzard AI</div>
                    <Cpu className="w-16 h-16 mb-6 text-bento-accent" />
                    <h3 className="text-2xl font-black mb-2 leading-tight uppercase tracking-tight">Universal Twin</h3>
                    <p className="text-[10px] font-black text-bento-muted uppercase tracking-[0.2em]">Agentic Intelligence</p>
                 </motion.div>
                 
                 <div className="mt-8 p-6 rounded-2xl bg-bento-card border border-bento-border text-center overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-bento-accent" />
                    <div className="text-[10px] font-black text-bento-muted uppercase tracking-widest mb-1">Optimization Speed</div>
                    <span className="text-3xl font-black block my-1 text-white">2.5H → 8MIN</span>
                    <span className="text-[10px] font-black text-bento-accent uppercase tracking-[0.3em]">Reduction</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
