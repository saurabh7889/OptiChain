import { motion } from "motion/react";
import { Truck, Box, Maximize, TrendingDown } from "lucide-react";

export default function CapacityCrisis() {
  return (
    <section className="section-padding bg-bento-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="bento-badge mb-6">Capacity Inefficiency</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
              Paying for <br />
              <span className="text-bento-accent">Empty Space</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bento-card p-6 rounded-3xl">
                <div className="text-4xl font-black text-white mb-2">58%</div>
                <p className="text-[10px] font-black text-bento-muted uppercase tracking-widest">Of truckloads move with significant empty trailer space.</p>
              </div>
              <div className="bento-card p-6 rounded-3xl">
                <div className="text-4xl font-black text-white mb-2">34 FT</div>
                <p className="text-[10px] font-black text-bento-muted uppercase tracking-widest">Average wasted linear feet per dynamic load.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-bento-accent/10 border border-bento-accent/20 flex items-center justify-center text-bento-accent">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-white uppercase text-xs tracking-widest mb-1">The Root Cause: Fear of LTL</h4>
                  <p className="text-xs font-medium text-bento-muted">Shippers lack confidence in Less-Than-Truckload (LTL) speed and reliability.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-bento-accent/5 border border-bento-accent/10">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-bento-accent flex items-center justify-center text-black">
                  <Maximize className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-white uppercase text-xs tracking-widest mb-1">The Reality</h4>
                  <p className="text-xs font-black text-bento-accent uppercase tracking-widest">1 in 3 trucks is moving empty.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
             {/* Truck Illustration */}
             <div className="relative bg-bento-card p-12 rounded-[48px] shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center border border-bento-border">
                <div className="absolute inset-0 opacity-5 pointer-events-none data-grid" />
                
                <div className="relative">
                  {/* Truck Cabin */}
                  <div className="flex items-end gap-2">
                    <div className="w-32 h-24 bg-slate-700 rounded-lg rounded-bl-3xl relative">
                       <div className="absolute top-4 left-4 w-12 h-8 bg-blue-100/20 rounded" />
                       <div className="absolute bottom-[-10px] left-4 w-8 h-8 bg-slate-800 rounded-full border-4 border-slate-900" />
                    </div>
                    {/* Truck Trailer */}
                    <div className="flex-1 h-48 bg-slate-800 rounded-xl relative border-2 border-slate-700 overflow-hidden flex items-end p-4">
                        {/* Wasted Space Indicator */}
                        <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center border-2 border-dashed border-amber-500/30 m-4 rounded-lg">
                           <div className="text-center">
                              <div className="text-2xl font-black text-amber-500">58% EMPTY</div>
                              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Wasted Resource</div>
                           </div>
                        </div>
                        
                        {/* Low-density cargo */}
                        <div className="relative z-10 flex gap-2 w-[42%]">
                           <div className="w-12 h-12 bg-slate-500 rounded animate-pulse" />
                           <div className="w-12 h-8 bg-slate-600 rounded mt-auto" />
                           <div className="w-8 h-12 bg-slate-500 rounded" />
                        </div>
                        
                        <div className="absolute bottom-[-10px] left-10 w-8 h-8 bg-slate-900 rounded-full border-4 border-slate-700" />
                        <div className="absolute bottom-[-10px] right-20 w-8 h-8 bg-slate-900 rounded-full border-4 border-slate-700" />
                        <div className="absolute bottom-[-10px] right-10 w-8 h-8 bg-slate-900 rounded-full border-4 border-slate-700" />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-center px-4">
                   <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-accent-blue" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Route Active: ORD → SFO</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-black text-red-500 uppercase tracking-[0.2em]">Efficiency Critical</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
