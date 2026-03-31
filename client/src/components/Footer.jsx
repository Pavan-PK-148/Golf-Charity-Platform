import { Link } from 'react-router-dom';
import { 
  Target, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  ArrowUpRight, 
  Activity,
  Lock
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#020617] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & Status Node */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-yellow-500 p-1.5 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <Target className="text-slate-900" size={20} strokeWidth={3} />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter italic text-white">
                Impact<span className="text-yellow-500">Golf</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 max-w-[200px]">
              The elite protocol for performance-based charitable giving.
            </p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Mainnet v4.0 Active</span>
            </div>
          </div>

          {/* Site Map Node */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-50">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'How it Works', path: '/how-it-works' },
                { name: 'Charity Partners', path: '/charity-partners' },
                { name: 'Leaderboard', path: '/leaderboard' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-slate-400 hover:text-yellow-500 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Safety Node */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-50">Protocols</h4>
            <ul className="space-y-4">
              {[
                { name: 'Terms of Play', path: '/terms' },
                { name: 'Security Protocols', path: '/protocols' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs Node (Replaced Social Links) */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative group overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu size={40} className="text-blue-400" />
             </div>
             <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">System Engine</h4>
             <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Activity size={14} className="text-yellow-500" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">RNG Draw Verifier</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Lock size={14} className="text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">PostgREST API v12</span>
                </div>
             </div>
             <p className="mt-8 text-[9px] font-black text-slate-500 uppercase tracking-widest">Protocol-Level Encryption</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
              © {currentYear} IMPACT GOLF PROTOCOL
            </p>
            <div className="hidden md:flex items-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-widest">
              <Globe size={12} /> Server: US-EAST-1
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <ShieldCheck size={14} className="text-blue-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">AES-256 Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}