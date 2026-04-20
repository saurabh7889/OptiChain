import { motion } from "motion/react";
import { ArrowRight, Box, Shield, Zap } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-bento-bg">
      <div className="absolute inset-0 data-grid opacity-20" />
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-bento-accent/10 rounded-full blur-[140px] opacity-40 -mr-1/4" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-bento-accent/5 rounded-full blur-[120px] opacity-30 -ml-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="bento-badge mb-6 inline-flex border border-bento-border">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bento-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bento-accent"></span>
            </span>
            Enterprise Grade AI
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
            OptiChain
            <span className="block text-bento-accent mt-2">Logistics Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-bento-muted font-medium max-w-2xl leading-relaxed mb-10">
            Bridging the intelligence gap with a unified digital twin. Reactive systems are legacy—predictive autonomy is the future.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="bg-bento-accent text-black px-10 py-5 rounded-3xl text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              Explore Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-transparent text-white border-2 border-bento-border px-10 py-5 rounded-3xl text-sm font-black uppercase tracking-widest hover:border-bento-accent transition-all">
              Watch Vision
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8">
             {[
               { icon: Zap, label: "Efficiency", value: "99.9%" },
               { icon: Box, label: "Throughput", value: "+45%" },
               { icon: Shield, label: "Security", value: "Verified" },
             ].map((stat, i) => (
               <div key={i} className="group">
                 <div className="flex items-center gap-2 text-bento-muted mb-2 group-hover:text-bento-accent transition-colors">
                   <stat.icon className="w-4 h-4" />
                   <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</span>
                 </div>
                 <div className="text-3xl font-black text-white">{stat.value}</div>
               </div>
             ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-square">
             <div className="absolute inset-0 rounded-[48px] overflow-hidden border-2 border-bento-border bg-bento-card p-4">
                <div className="w-full h-full rounded-[32px] overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/bento-logistics/1200/1200" 
                    alt="Network Map" 
                    className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-bento-accent/5" />
                  
                  {/* Visualizing "Nodes" */}
                  {[
                    { top: '20%', left: '30%' },
                    { top: '50%', left: '60%' },
                    { top: '70%', left: '20%' },
                    { top: '40%', left: '80%' },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute w-3 h-3 bg-bento-accent rounded-full shadow-[0_0_15px_#00F0FF]"
                      style={{ top: pos.top, left: pos.left }}
                    />
                  ))}
                </div>
             </div>
             
             {/* Floating UI Widget */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -bottom-6 -left-6 bg-bento-card p-8 rounded-[32px] shadow-2xl w-72 border border-bento-border"
             >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-bento-accent/10 border border-bento-accent/20 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-bento-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-bento-accent uppercase tracking-widest mb-1">Status</div>
                    <div className="text-md font-black text-white">Vizzard Core Active</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black text-bento-muted uppercase tracking-widest">
                    <span>Performance</span>
                    <span className="text-white">A+</span>
                  </div>
                  <div className="h-1.5 w-full bg-bento-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      className="h-full bg-bento-accent"
                    />
                  </div>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
