import { motion } from "motion/react";
import { Clock, AlertOctagon, TrendingDown, DollarSign } from "lucide-react";

export default function DwellTimeClock() {
  return (
    <section className="section-padding bg-bento-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20 items-center">
        <div className="lg:col-span-12 md:text-center mb-12">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
               The Time Trap: <br />
               <span className="text-bento-accent">Operational Inefficiency</span>
            </h2>
            <div className="h-1 w-40 bg-bento-accent rounded-full md:mx-auto opacity-50" />
        </div>

        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="space-y-8">
            <div className="bento-card border-none bg-white/5">
              <div className="flex items-center gap-3 mb-4 text-bento-accent">
                <Clock className="w-6 h-6" />
                <h3 className="text-lg font-black uppercase tracking-widest">Dwell Time Reality</h3>
              </div>
              <p className="text-lg text-bento-muted leading-relaxed font-medium">
                <span className="text-white font-bold">63% of drivers</span> wait <span className="text-bento-accent font-black">3+ hours</span> at docks due to labor misalignment.
              </p>
            </div>

            <div className="p-8 rounded-[40px] bg-bento-card border border-bento-border shadow-2xl">
               <div className="flex items-center gap-3 mb-6 text-white/50">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Financial impact</span>
               </div>
               <div className="text-5xl md:text-6xl font-black text-white mb-2">$6.2M</div>
               <div className="text-xs font-bold text-bento-muted uppercase tracking-[0.2em]">Annual Penalty per Enterprise</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
           <div className="relative aspect-square max-w-[500px] mx-auto">
              {/* Circular Clock Visualization */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="6"
                />
                <motion.circle
                  initial={{ strokeDashoffset: 283 }}
                  whileInView={{ strokeDashoffset: 180 }}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                 <div className="text-[10px] font-black text-bento-muted uppercase tracking-[0.4em] mb-2">Wait Period</div>
                 <div className="text-8xl font-black text-white leading-none tracking-tighter">5+</div>
                 <div className="text-xl font-black text-bento-accent uppercase tracking-[0.3em] mt-2">HOURS</div>
                 
                 <div className="mt-8 flex gap-1.5">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className={`w-10 h-1.5 rounded-full ${i > 3 ? 'bg-bento-accent' : 'bg-white/10'}`} />
                    ))}
                 </div>
              </div>

              {/* Penalty Indicators */}
              {[
                { label: "SLA Failure", top: "10%", right: "10%", delay: 0.2 },
                { label: "Detention Fee", bottom: "15%", left: "5%", delay: 0.4 },
              ].map((penalty, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: penalty.delay }}
                  className="absolute bento-badge !bg-bento-card border border-bento-border shadow-2xl flex items-center gap-2"
                  style={{ top: penalty.top, bottom: penalty.bottom, left: penalty.left, right: penalty.right }}
                >
                   <AlertOctagon className="w-3 h-3 text-bento-accent" />
                   <span className="text-[9px] font-black uppercase tracking-widest">{penalty.label}</span>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
