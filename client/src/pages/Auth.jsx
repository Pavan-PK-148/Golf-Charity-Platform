import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Target, Mail, Lock, Heart, ArrowLeft, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [charity, setCharity] = useState('1'); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Updated to match your profiles table schema
            data: { 
              selected_charity: charity, 
              contribution_percent: 10,
              is_admin: false 
            }
          }
        });

        if (error) throw error;

        // BUG FIX: If Supabase is set to 'confirm email', we alert. 
        // If 'Auto-confirm' is on, we redirect immediately.
        if (data?.session) {
          navigate('/dashboard');
        } else {
          alert('Success! Please check your email to verify your account.');
          setIsLogin(true);
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-all font-black uppercase text-[10px] tracking-widest mb-8 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Terminal
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl"
        >
          <div className="mb-10 text-center">
            <div className="bg-yellow-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              <Target className="text-slate-900" size={30} strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              {isLogin ? 'Access' : 'Enroll'}<span className="text-yellow-500">.</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
              {isLogin ? 'Authorized Personnel Only' : 'Join the Impact Protocol'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">EMail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="name@domain.com" 
                  className="w-full rounded-2xl bg-slate-900/50 border border-white/5 py-4 pl-12 pr-4 text-sm outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all text-white"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full rounded-2xl bg-slate-900/50 border border-white/5 py-4 pl-12 pr-4 text-sm outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all text-white"
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1 overflow-hidden"
                >
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                    <Heart className="h-3 w-3 text-red-500" /> Charity Allocation
                  </label>
                  <select 
                    className="w-full rounded-2xl bg-slate-900/50 border border-white/5 py-4 px-4 text-sm outline-none focus:border-yellow-500/50 transition-all text-white appearance-none cursor-pointer"
                    onChange={(e) => setCharity(e.target.value)}
                  >
                    <option value="1">Red Cross Golf Fund</option>
                    <option value="2">Green Fairways Initiative</option>
                    <option value="3">Youth Sports Foundation</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full rounded-2xl bg-yellow-500 py-4 font-black uppercase tracking-widest text-slate-900 text-xs hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  {isLogin ? 'Login Now' : 'Create Profile'}
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {isLogin ? "New to the protocol?" : "Already verified?"}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-2 text-yellow-500 hover:text-yellow-400 transition-colors underline decoration-yellow-500/30 underline-offset-4 cursor-pointer"
              >
                {isLogin ? 'Register Now' : 'Login Now'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}