import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Navigation, Loader2 } from "lucide-react";

export default function RouteOptimizer() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ path: string[], distance: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: start.trim(), end: end.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate route.');
      }

      setResult({ path: data.path, distance: data.distance });
    } catch (err: any) {
      setError(err.message || 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="optimizer" className="section-padding bg-bento-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
           <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              Try the <span className="text-bento-accent">Vizzard AI</span> Core
           </h2>
           <p className="text-lg text-bento-muted font-medium">
              Experience the power of real-time logistics optimization. Enter a start and end location below to calculate the most optimal route instantly.
           </p>
        </div>

        <div className="bento-card relative overflow-hidden p-8 md:p-12 z-10 w-full max-w-2xl mx-auto border-bento-accent/30 shadow-[0_0_50px_rgba(0,240,255,0.05)]">
           <div className="absolute inset-0 bg-bento-accent/5 blur-2xl rounded-full" />
           <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-black text-bento-muted uppercase tracking-widest block mb-2">Starting Location</label>
                    <div className="relative">
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-bento-muted w-5 h-5" />
                       <input 
                         type="text" 
                         value={start}
                         onChange={e => setStart(e.target.value)}
                         placeholder="e.g., Node A" 
                         required
                         className="w-full bg-[#1A1A1A] border border-bento-border rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-bento-accent focus:ring-1 focus:ring-bento-accent transition-all font-medium"
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-xs font-black text-bento-muted uppercase tracking-widest block mb-2">Destination</label>
                    <div className="relative">
                       <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-bento-muted w-5 h-5" />
                       <input 
                         type="text" 
                         value={end}
                         onChange={e => setEnd(e.target.value)}
                         placeholder="e.g., Node F" 
                         required
                         className="w-full bg-[#1A1A1A] border border-bento-border rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-bento-accent focus:ring-1 focus:ring-bento-accent transition-all font-medium"
                       />
                    </div>
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black font-black uppercase tracking-widest text-sm py-4 rounded-2xl hover:bg-bento-accent transition-colors flex items-center justify-center gap-2"
              >
                 {loading ? (
                    <>
                       <Loader2 className="w-5 h-5 animate-spin" />
                       Calculating...
                    </>
                 ) : (
                    "Optimize Route"
                 )}
              </button>
           </form>

           {error && (
              <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center"
              >
                 {error}
              </motion.div>
           )}

           {result && (
              <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="mt-8 pt-8 border-t border-bento-border space-y-6 relative z-10"
              >
                 <div>
                    <label className="text-xs font-black text-bento-muted uppercase tracking-widest block mb-4">Optimal Path Found</label>
                    <div className="flex flex-wrap items-center gap-2 font-medium">
                       {result.path.map((node, index) => (
                          <div key={index} className="flex items-center gap-2">
                             <div className="bg-bento-accent/10 border border-bento-accent/30 text-bento-accent px-4 py-2 rounded-full text-sm font-bold tracking-tight">
                                {node}
                             </div>
                             {index < result.path.length - 1 && (
                                <span className="text-bento-muted font-black text-lg">→</span>
                             )}
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="flex justify-between items-end bg-[#1A1A1A] p-6 rounded-2xl border border-bento-border">
                    <span className="text-xs font-black text-bento-muted uppercase tracking-widest">Total Cost / Distance</span>
                    <span className="text-3xl font-black text-white leading-none">{result.distance}</span>
                 </div>
              </motion.div>
           )}
        </div>
      </div>
    </section>
  );
}
