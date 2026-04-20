import { motion } from "motion/react";
import { DollarSign, Users, Package, AlertCircle } from "lucide-react";

export default function WarehouseImpact() {
  const points = [
    {
      id: "01",
      title: "The Mispick Multiplier",
      impact: "$389,000 Annual Loss",
      stat: "Cost per manual mispick: $22",
      icon: DollarSign,
      color: "bg-red-500"
    },
    {
      id: "02",
      title: "Labor Inefficiency",
      impact: "50% of Total Labor Costs",
      stat: "Inefficient layouts and manual tracking drive up costs.",
      icon: Users,
      color: "bg-red-500"
    },
    {
      id: "03",
      title: "Inventory Distortion",
      impact: "63% Inventory Accuracy",
      stat: "Leads to chronic overstocking and costly stockouts.",
      icon: Package,
      color: "bg-red-500"
    }
  ];

  return (
    <section className="section-padding bg-bento-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-8">
            <div className="bento-badge mb-4">Critical Vulnerability</div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
              Micro-Failures, <br />
              <span className="text-bento-muted">Macro-Losses</span>
            </h2>
            <p className="text-xl text-bento-muted font-medium max-w-xl">
               Small operational inefficiencies accumulate into massive financial hemorrhages across global distribution nodes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bento-card group flex flex-col gap-8"
            >
              <div className="flex justify-between items-start">
                 <div className="text-base font-black text-bento-accent tracking-[0.3em] uppercase">{p.id}</div>
                 <div className="w-12 h-12 rounded-xl bg-bento-bg border border-bento-border flex items-center justify-center text-white group-hover:border-bento-accent transition-colors">
                    <p.icon className="w-5 h-5" />
                 </div>
              </div>
              
              <div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{p.title}</h3>
                <div className="text-bento-accent font-black text-lg mb-4">{p.impact}</div>
                <p className="text-sm font-medium text-bento-muted leading-relaxed">{p.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Isometric Warehouse Style Mockup */}
        <div className="mt-20 relative rounded-[40px] overflow-hidden bg-slate-100 aspect-[21/9] border-2 border-slate-100 flex items-center justify-center p-12">
           <div className="absolute inset-0 data-grid opacity-20" />
           <div className="text-center relative z-10">
              <div className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Infrastructure Visualization</div>
              {/* This would be an illustration in a real setting, here we simulate with stylized text/blocks */}
              <div className="flex gap-4 items-center justify-center">
                 {[1,2,3,4,5,6].map((i) => (
                   <div key={i} className="w-12 h-32 bg-slate-200 rounded-lg flex flex-col gap-2 p-2 relative overflow-hidden">
                      <div className="w-full h-1/4 bg-slate-300 rounded" />
                      <div className="w-full h-1/4 bg-slate-300 rounded" />
                      {i % 2 === 0 && <div className="absolute top-1/2 left-0 right-0 h-4 bg-red-400/30 animate-pulse" />}
                   </div>
                 ))}
              </div>
           </div>
           
           {/* Marker overlays */}
           <motion.div 
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute top-[20%] left-[40%] w-8 h-8 rounded-full bg-red-500 shadow-2xl flex items-center justify-center"
           >
              <AlertCircle className="w-4 h-4 text-white" />
           </motion.div>
           <motion.div 
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
             className="absolute bottom-[30%] right-[35%] w-8 h-8 rounded-full bg-red-500 shadow-2xl flex items-center justify-center"
           >
              <AlertCircle className="w-4 h-4 text-white" />
           </motion.div>
        </div>
      </div>
    </section>
  );
}
