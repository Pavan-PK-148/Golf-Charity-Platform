import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Zap, 
  BarChart3, Heart, Trophy, ShieldCheck, 
  MousePointer2, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: MousePointer2,
      title: "01. Secure Enrollment",
      desc: "Join the Impact community with a Pro subscription. 10% of your monthly fee is immediately allocated to your selected charity partner.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: BarChart3,
      title: "02. Performance Tracking",
      desc: "Log your Stableford scores after every round. Our system maintains a 'Rolling 5' logic, using your 5 most recent scores to verify active participation.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      icon: Zap,
      title: "03. The Monthly Draw",
      desc: "Every month, our verifiable engine generates 5 winning numbers (1-45). If your logged scores match the draw, you win.",
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
    {
      icon: Trophy,
      title: "04. Instant Verification",
      desc: "Winners upload a screenshot of their scorecard. Once the Admin Terminal verifies the proof, funds are dispatched to your account.",
      color: "text-green-400",
      bg: "bg-green-400/10"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-yellow-500 selection:text-black">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
        
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-all font-black uppercase text-[10px] tracking-widest mb-16 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Terminal
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            The <span className="text-yellow-500">Protocol.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
            A transparent ecosystem where golf performance meets charitable impact. No hidden fees, just pure impact.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid gap-6 mb-24">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-8 hover:bg-white/[0.07] transition-all"
            >
              <div className={`w-20 h-20 shrink-0 ${step.bg} rounded-[2rem] flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                <step.icon className={step.color} size={36} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3 flex items-center gap-3">
                  {step.title}
                  <CheckCircle2 size={18} className="text-white/20 group-hover:text-yellow-500 transition-colors" />
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Mechanics Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 p-10 rounded-[3rem]">
            <div className="flex items-center gap-2 text-yellow-500 font-black uppercase text-[10px] tracking-[0.2em] mb-6">
              <ShieldCheck size={16} /> Draw Integrity
            </div>
            <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-white">Verifiable Draws</h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Our monthly draws use a transparent RNG algorithm. Winning numbers are cross-referenced with your Rolling 5 score database to ensure fairness and prevent tampering.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-10 rounded-[3rem]">
            <div className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-[0.2em] mb-6">
              <Heart size={16} /> Impact Logic
            </div>
            <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-white">Direct Donations</h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              We operate on a "Fixed Contribution" model. Unlike other platforms, we don't take a cut of the charity pool. 100% of the allocated 10% goes to the NGO.
            </p>
          </div>
        </div>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center py-20 bg-white/5 border border-white/10 rounded-[4rem] relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-yellow-500/30" />
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-10 px-4">
            Enough reading. <br />
            <span className="text-yellow-500">Ready to play?</span>
          </h2>
          <button 
            onClick={() => navigate('/auth')}
            className="bg-yellow-500 text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all flex items-center gap-3 mx-auto shadow-2xl shadow-yellow-500/20"
          >
            Create Your Profile <ChevronRight size={20} strokeWidth={3} />
          </button>
        </motion.div>

        <footer className="mt-20 text-center opacity-30">
          <p className="text-[9px] font-black uppercase tracking-[0.5em]">System Status: All Nodes Operational</p>
        </footer>
      </div>
    </div>
  );
}