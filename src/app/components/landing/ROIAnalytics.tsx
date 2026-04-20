import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target, Zap, TrendingUp, ShieldCheck } from "lucide-react";

const data1 = [
  { name: 'Baseline', value: 90 },
  { name: 'OptiChain', value: 99 },
];

const data2 = [
  { name: 'Baseline', value: 180 },
  { name: 'OptiChain', value: 45 },
];

const data3 = [
  { name: 'Baseline', value: 130 },
  { name: 'OptiChain', value: 175 },
];

const data4 = [
  { name: 'Baseline', value: 175 },
  { name: 'OptiChain', value: 40 },
];

interface ROICardProps {
  title: string;
  subtitle: string;
  data: any[];
  icon: any;
  suffix?: string;
}

const ROICard = ({ title, subtitle, data, icon: Icon, suffix = "" }: ROICardProps) => (
  <div className="p-10 rounded-[40px] bg-bento-card border border-bento-border shadow-2xl flex flex-col gap-8 group">
     <div className="flex justify-between items-start">
        <div className="flex gap-4">
           <div className="p-4 rounded-xl bg-bento-bg text-bento-muted border border-bento-border group-hover:border-bento-accent transition-colors">
              <Icon className="w-6 h-6" />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
              <p className="text-[10px] font-black text-bento-muted uppercase tracking-widest mt-1">{subtitle}</p>
           </div>
        </div>
     </div>

     <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.2)', fontWeight: 900, fontSize: 8, textTransform: 'uppercase' }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-bento-card border border-bento-border text-white px-3 py-2 rounded-lg text-xs font-black shadow-2xl">
                        {payload[0].value}{suffix}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                 {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={index === 1 ? '#00F0FF' : 'rgba(255,255,255,0.05)'} />
                 ))}
              </Bar>
           </BarChart>
        </ResponsiveContainer>
     </div>

     <div className="pt-8 border-t border-bento-border flex items-center justify-between">
        <div className="text-[10px] font-black text-bento-muted uppercase tracking-[0.3em]">Performance Target</div>
        <div className="text-2xl font-black text-white tracking-widest shadow-[0_0_15px_#00F0FF]/10">{data[1].value}{suffix}</div>
     </div>
  </div>
);

export default function ROIAnalytics() {
  return (
    <section id="roi" className="section-padding bg-bento-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-5" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
           <div className="max-w-2xl">
              <div className="bento-badge mb-4">Operational Yield</div>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] uppercase">
                 The Yield <br />
                 <span className="text-bento-accent">Bottom Line ROI</span>
              </h2>
           </div>
           <p className="max-w-sm text-bento-muted font-medium leading-relaxed mb-2 uppercase text-[11px] tracking-widest">
              OptiChain transforms supply chains from cost centers into high-margin competitive advantages through automated intelligence.
           </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-8">
           <ROICard 
             title="Order Accuracy" 
             subtitle="99%+ Perfect Order Rate"
             data={data1} 
             icon={Target}
             suffix="%"
           />
           <ROICard 
             title="Facility Throughput" 
             subtitle="<45 Minutes Avg Dwell"
             data={data2} 
             icon={Zap}
             suffix="m"
           />
           <ROICard 
             title="Capital Efficiency" 
             subtitle="20% Turnover Improvement"
             data={data3} 
             icon={TrendingUp}
             suffix=" pts"
           />
           <ROICard 
             title="Loss Prevention" 
             subtitle="82% Reduction in fraud"
             data={data4} 
             icon={ShieldCheck}
             suffix="%"
           />
        </div>

        <div className="mt-20 p-16 rounded-[48px] bg-bento-card border border-bento-border text-white text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 data-grid opacity-5 pointer-events-none" />
           <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl font-medium text-bento-muted mb-8 leading-relaxed italic">
                 "Our distribution network moved from a 12% margin loss lead to a primary driver of enterprise value within 6 months of OptiChain activation."
              </p>
              <div className="h-1 w-12 bg-bento-accent mx-auto mb-6 opacity-30 shadow-[0_0_10px_#00F0FF]" />
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Fortune 500 Chief Supply Chain Officer</div>
           </div>
        </div>
      </div>
    </section>
  );
}
