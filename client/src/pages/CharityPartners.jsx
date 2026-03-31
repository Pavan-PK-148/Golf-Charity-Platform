import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Globe, ArrowLeft, ArrowUpRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CharityPartners() {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharities = async () => {
      const { data } = await supabase.from('charities').select('*');
      setCharities(data || []);
      setLoading(false);
    };
    fetchCharities();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-yellow-500" /></div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-all font-black uppercase text-[10px] tracking-widest mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Terminal
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Impact <span className="text-red-500">Nodes</span></h1>
          <p className="text-slate-500 uppercase font-black text-[10px] tracking-[0.3em]">Verified Global Beneficiaries</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {charities.map((charity) => (
            <motion.div whileHover={{ y: -5 }} key={charity.id} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Globe size={60} /></div>
              <Heart className="text-red-500 mb-6" size={32} />
              <h3 className="text-xl font-black uppercase italic mb-4">{charity.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{charity.description}</p>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Raised</p>
                  <p className="text-xl font-black text-white">${charity.total_raised?.toLocaleString() || '0.00'}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-yellow-500 transition-colors"><ArrowUpRight size={20} /></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}