import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Gavel, ShieldAlert, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfPlay() {
  const sections = [
    {
      id: "1.0",
      title: "Eligibility Protocol",
      icon: Gavel,
      content: "Players must maintain an active Pro subscription to enter monthly draws. Use of 'Sandbagging' or fraudulent score reporting will result in immediate protocol blacklisting and forfeiture of all pending winnings.",
    },
    {
      id: "2.0",
      title: "Draw Participation",
      icon: ShieldAlert,
      content: "Winners are selected based on the 5 winning numbers generated at the end of each UTC month. Verification requires an official scorecard screenshot and a GPS-verified round timestamp.",
    },
    {
      id: "3.0",
      title: "Charity Logic",
      icon: HeartHandshake,
      content: "Donations are non-refundable and are processed within 72 hours of the billing cycle. Impact Golf operates as a non-custodial pass-through; we do not deduct administrative fees from the 10% charity pool.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-6 leading-relaxed selection:bg-yellow-500 selection:text-black">
      {/* Background Decorative Element */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-all font-black uppercase text-[10px] tracking-[0.3em] mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Return to Terminal
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-10">
            <div>
              <div className="flex items-center gap-3 text-yellow-500 mb-4">
                <FileText size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Legal Documentation</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
                Rules of <span className="text-yellow-500">Engagement</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Version Control</p>
              <p className="text-xs font-bold text-slate-300">v4.0.26 — MARCH 2026</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-white/5 rounded-lg text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    <section.icon size={18} />
                  </div>
                  <h2 className="text-yellow-500 font-black uppercase text-xs tracking-[0.2em]">
                    {section.id} {section.title}
                  </h2>
                </div>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed pl-12 border-l border-white/5 group-hover:border-yellow-500/30 transition-colors">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Footer Warning */}
          <div className="mt-16 pt-10 border-t border-white/5">
            <div className="bg-yellow-500/5 rounded-2xl p-6 border border-yellow-500/10 flex items-start gap-4">
              <ShieldAlert className="text-yellow-500 shrink-0" size={20} />
              <p className="text-[10px] leading-relaxed text-slate-500 font-medium uppercase tracking-wider">
                BY ACCESSING THE IMPACT GOLF PROTOCOL, YOU ACKNOWLEDGE THAT ALL GOLF SCORES ARE SUBJECT TO INDEPENDENT AUDIT AND CHARITABLE DONATIONS ARE PROCESSED AS FINAL TRANSACTIONS.
              </p>
            </div>
            
            <p className="mt-10 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
              End of Transmission — Protocol Secured
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}