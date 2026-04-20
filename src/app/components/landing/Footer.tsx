import { Twitter, Linkedin, Github, Globe, Box } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bento-bg text-white pt-24 pb-12 border-t border-bento-border relative overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-bento-card border border-bento-border rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-bento-accent rounded-full animate-pulse shadow-[0_0_10px_#00F0FF]" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white">OptiChain</span>
            </div>
            <p className="text-bento-muted font-medium max-w-sm leading-relaxed mb-8 text-sm">
              The sovereign intelligence layer for global orchestration. Predictive, proactive, and autonomously optimized for the volatile global market.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Globe].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-bento-card border border-bento-border flex items-center justify-center hover:text-bento-accent hover:border-bento-accent transition-all cursor-pointer text-bento-muted">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-bento-accent">Platform</h4>
            <ul className="space-y-4">
              {['Vizzard AI Core', 'Unified Digital Twin', 'Agentic Action Loop', 'Sovereign Architecture', 'Global Integrations'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-bento-muted hover:text-white transition-colors text-xs font-black uppercase tracking-widest">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-bento-accent">Enterprise</h4>
            <ul className="space-y-4">
              {['ROI Theorem', 'Case Studies', 'Security Protocol', 'Global Compliance', 'Infrastructure SLA'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-bento-muted hover:text-white transition-colors text-xs font-black uppercase tracking-widest">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-bento-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
          <p>
            © 2026 OptiChain Intelligence. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-white/40">
             <a href="#" className="hover:text-bento-accent transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-bento-accent transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-bento-accent transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
