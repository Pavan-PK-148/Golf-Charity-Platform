import { Link } from 'react-router-dom';
import { ShieldCheck, Database, Cpu, Lock, ArrowLeft } from 'lucide-react';

export default function Protocols() {
  const items = [
    { icon: ShieldCheck, title: "AES-256 Encryption", desc: "All identity data and payout proofs are encrypted at rest using bank-grade security protocols." },
    { icon: Database, title: "Verifiable Ledger", desc: "Donation history is logged on an immutable database to ensure charity transparency." },
    { icon: Cpu, title: "RNG Engine", desc: "Our draw engine uses a cryptographically secure random number generator (CSPRNG) for all monthly rewards." },
    { icon: Lock, title: "RLS Protection", desc: "Row Level Security prevents unauthorized cross-player data access." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-all font-black uppercase text-[10px] tracking-widest mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Terminal
        </Link>

        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-12 flex items-center gap-4">
          <Cpu className="text-blue-500" /> Security <span className="text-blue-500">Manifesto</span>
        </h1>
        
        <div className="grid gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-black/40 border border-blue-500/20 p-8 rounded-2xl group hover:border-blue-500/50 transition-all">
              <item.icon className="text-blue-500 mb-4" size={24} />
              <h3 className="text-lg font-black uppercase mb-2 tracking-widest">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}