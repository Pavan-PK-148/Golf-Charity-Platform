import { useNavigate } from 'react-router-dom';
import { Heart, Trophy, Target, ArrowRight, ShieldCheck, Globe, Zap, ChevronRight, Database, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-[#020617] text-slate-100 min-h-screen font-sans selection:bg-yellow-500 selection:text-black overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 flex flex-row justify-between items-center px-4 sm:px-8 py-6 md:py-8 max-w-7xl mx-auto w-full">
  {/* Brand Logo - Responsive sizing */}
  <div className="flex items-center gap-2 shrink-0">
    <div className="bg-yellow-500 p-1.5 md:p-2 rounded-lg">
      <Target className="text-slate-900 w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
    </div>
    <span className="text-lg md:text-2xl font-black uppercase tracking-tighter italic">
      Impact<span className="text-yellow-500">Golf</span>
    </span>
  </div>

  {/* Cyberpunk Button - Enhanced with Responsive Padding & Font Scale */}
  <button 
    onClick={() => navigate('/auth')}
    className="group relative px-5 sm:px-10 py-3 md:py-4 rounded-full overflow-hidden transition-all duration-500 cursor-pointer border border-white/20 bg-[#020617] shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:border-yellow-500/60 flex-shrink-0"
  >
    {/* Layer 1: Moving Background Gradient - Restored */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

    {/* Layer 2: Subtle Grid Overlay - Restored */}
    <div 
      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transition-opacity" 
      style={{ 
        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
        backgroundSize: '10px 10px' 
      }} 
    />

    {/* Layer 3: Corner Accents - Restored */}
    <div className="absolute top-0 left-4 w-4 h-[2px] bg-yellow-500/0 group-hover:bg-yellow-500 transition-all duration-300" />
    <div className="absolute bottom-0 right-4 w-4 h-[2px] bg-yellow-500/0 group-hover:bg-yellow-500 transition-all duration-300" />

    {/* Button Content */}
    <div className="relative flex items-center gap-2 md:gap-4">
      {/* Scanning Dot - Essential for Elite UI */}
      <div className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-yellow-500"></span>
      </div>

      <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-300 group-hover:text-white transition-all duration-300 whitespace-nowrap">
        Player <span className="text-yellow-500 group-hover:drop-shadow-[0_0_10px_#eab308]">Login</span>
      </span>

      {/* Right Arrow - Hover animation preserved */}
      <div className="hidden sm:block overflow-hidden w-0 group-hover:w-4 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
        <ChevronRight size={16} className="text-yellow-500" />
      </div>
    </div>

    {/* Layer 4: Interactive Glow - Restored */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(234,179,8,0.15)_0%,transparent_50%)]" />
  </button>
</nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[85vh] flex items-center justify-center pt-20 pb-40 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full mb-8">
            <Zap size={14} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">Now Live: Monthly $450 Prize Pool</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic uppercase leading-[0.9]">
            Play for <span className="text-yellow-500 drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]">Purpose.</span> <br />
            Win for <span className="text-blue-400">Change.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-12 font-medium leading-relaxed">
            The elite subscription platform where your golf performance fuels 
            global impact and enters you into physics-based prize draws.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="w-full md:w-auto bg-yellow-500 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(234,179,8,0.2)] cursor-pointer"
            >
              Get Started <ArrowRight size={18} strokeWidth={3} />
            </motion.button>
            <button 
  onClick={() => navigate('/how-it-works')} 
  className="relative group w-full md:w-auto px-10 py-5 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
>
  {/* Background Layer: Glassmorphism */}
  <div className="absolute inset-0 bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500" />
  
  {/* Animated "Scanning" Beam */}
  <div className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent transition-transform duration-700 ease-in-out" />

  {/* Button Content */}
  <div className="relative flex items-center justify-center gap-3">
    <span className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.5)] transition-all duration-300">
      How it Works
    </span>
    
    {/* Animated Icon */}
    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-yellow-500 group-hover:animate-ping transition-colors duration-300" />
  </div>

  {/* Bottom Accent Line */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-yellow-500 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#eab308]" />
</button>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 py-15 lg:py-32 overflow-hidden">
  {/* Background Glow Orbs for the Section */}
  <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

  <div className="max-w-7xl mx-auto px-6">
    <div className="mb-16 text-center">
      <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">System Core</span>
      <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Impact</span></h2>
    </div>

    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-8"
    >
      {[
        { 
          icon: Heart, 
          title: "10% Contribution", 
          desc: "Every subscription fee supports verified charities of your choice.", 
          color: "text-red-500", 
          accent: "group-hover:border-red-500/50",
          glow: "bg-red-500/5"
        },
        { 
          icon: Target, 
          title: "Rolling 5 Logic", 
          desc: "We track your last 5 Stableford scores to determine draw eligibility.", 
          color: "text-blue-400", 
          accent: "group-hover:border-blue-400/50",
          glow: "bg-blue-400/5"
        },
        { 
          icon: Trophy, 
          title: "Automated Draws", 
          desc: "Transparent prize distribution powered by our verifiable draw engine.", 
          color: "text-yellow-500", 
          accent: "group-hover:border-yellow-500/50",
          glow: "bg-yellow-500/5"
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          variants={itemVariants}
          className={`relative group p-[1px] rounded-[3rem] transition-all duration-700 overflow-hidden bg-white/10 ${item.accent}`}
        >
          {/* Inner Content Card */}
          <div className="relative z-10 h-full bg-[#020617]/90 backdrop-blur-3xl p-10 rounded-[2.9rem] flex flex-col items-start overflow-hidden">
            
            {/* Animated Background Shimmer */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${item.glow} pointer-events-none`} />
            
            {/* Corner Bracket Accent */}
            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
               <div className="w-8 h-[1px] bg-white/20" />
               <div className="w-[1px] h-8 bg-white/20 absolute top-0 right-0" />
            </div>

            {/* Icon Container */}
            <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>
              <div className="absolute inset-0 bg-white/5 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white/5 rounded-2xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
              <item.icon className={`${item.color} relative z-10 transition-transform duration-500 group-hover:scale-110`} size={32} />
            </div>

            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-white">
              {item.title}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">
              {item.desc}
            </p>

            {/* "Data Line" at the bottom */}
            <div className="mt-auto pt-6 w-full border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Active Protocol</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(dot => (
                   <div key={dot} className={`w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}/40`} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

{/* Protocol Sequence Section */}
<section className="relative z-10 py-32 bg-[#020617]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
      <div className="max-w-2xl">
        <h2 className="text-yellow-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4">Operational Workflow</h2>
        <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
          The Winner's <span className="text-white/20">Protocol</span>
        </h3>
      </div>
      <p className="text-slate-500 font-medium text-sm max-w-sm border-l border-white/10 pl-6">
        A transparent, multi-layered system designed to validate skill and automate impact.
      </p>
    </div>

    <div className="grid md:grid-cols-4 gap-4 relative">
      {/* Connecting Line (Desktop Only) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

      {[
        {
          step: "01",
          icon: ShieldCheck,
          label: "Auth & Align",
          desc: "Securely link your profile and select your primary charity partner.",
          color: "blue"
        },
        {
          step: "02",
          icon: Database,
          label: "Data Ingest",
          desc: "Log your Stableford scores. Our system maintains your 'Rolling 5' average.",
          color: "yellow"
        },
        {
          step: "03",
          icon: Zap,
          label: "Draw Entry",
          desc: "Active subscribers with valid scores are automatically entered into monthly draws.",
          color: "green"
        },
        {
          step: "04",
          icon: HeartHandshake,
          label: "Impact Lock",
          desc: "Winners trigger a 10% charity distribution and instant prize payout.",
          color: "purple"
        }
      ].map((item, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ y: -10 }}
          className="relative z-10 bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl group hover:bg-white/[0.05] transition-all duration-500"
        >
          {/* Step Number Badge */}
          <div className="flex justify-between items-start mb-10">
            <span className="text-4xl font-black italic text-white/5 group-hover:text-yellow-500/20 transition-colors duration-500">
              {item.step}
            </span>
            <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all duration-500 shadow-xl`}>
              <item.icon size={24} />
            </div>
          </div>

          <h4 className="text-lg font-black uppercase tracking-tighter italic mb-3 group-hover:text-yellow-500 transition-colors">
            {item.label}
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed font-medium">
            {item.desc}
          </p>

          {/* Bottom Pulse Dot */}
          <div className="mt-8 flex items-center gap-2">
             <div className="h-1 w-1 rounded-full bg-yellow-500 animate-pulse" />
             <div className="h-[1px] w-full bg-gradient-to-r from-yellow-500/20 to-transparent" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Trust Bar */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 font-black uppercase tracking-widest text-sm">
            <ShieldCheck size={20} /> Verified Payouts
          </div>
          <div className="flex items-center gap-2 font-black uppercase tracking-widest text-sm">
            <Globe size={20} /> Global Impact
          </div>
          <div className="flex items-center gap-2 font-black uppercase tracking-widest text-sm">
            <Target size={20} /> R&A Compliant
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}