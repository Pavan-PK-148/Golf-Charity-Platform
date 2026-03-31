import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Plus, Award, Heart, CreditCard, Loader2, LogOut, ChevronRight, Target, UploadCloud, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newScore, setNewScore] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const fetchScores = useCallback(async (userId) => {
    const { data: scoreData, error } = await supabase
      .from('golf_scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    if (!error) setScores(scoreData || []);
  }, []);

  useEffect(() => {
    const initDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); return; }
      setUser(user);
      await fetchScores(user.id);
      setLoading(false);
    };
    initDashboard();
  }, [navigate, fetchScores]);

  const submitScore = async () => {
    const scoreVal = parseInt(newScore);
    if (isNaN(scoreVal) || scoreVal < 1 || scoreVal > 45) {
      toast.error("Invalid Score", { description: "Please enter a score between 1 and 45." });
      return;
    }
    
    setIsSubmitting(true);
    const { data: currentScores } = await supabase
      .from('golf_scores')
      .select('id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (currentScores && currentScores.length >= 5) {
      await supabase.from('golf_scores').delete().eq('id', currentScores[0].id);
    }

    const { error } = await supabase.from('golf_scores').insert([{ user_id: user.id, score: scoreVal }]);
    
    if (!error) { 
      toast.success("Round Recorded!", { description: `Score of ${scoreVal} added to your rolling 5.` });
      setNewScore(''); 
      await fetchScores(user.id); 
    } else {
      toast.error("Submission Failed", { description: error.message });
    }
    setIsSubmitting(false);
  };

  const handleUploadProof = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    setUploading(true);
    const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
    const filePath = `proofs/${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('winner-proofs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: urlData } = supabase.storage
      .from('winner-proofs')
      .getPublicUrl(filePath);

    // 3. Insert into payout_claims Table
    const { error: dbError } = await supabase
      .from('payout_claims')
      .insert([{
        user_id: user.id,
        proof_url: urlData.publicUrl,
        status: 'pending',
        amount: 450.00
      }]);

    if (dbError) throw dbError;

    toast.success("Claim submitted successfully!");
  } catch (e) {
    toast.error("Submission failed: " + e.message);
  } finally {
    setUploading(false);
  }
};

  useEffect(() => {
  if (!user) return;

  // Listen for changes to the 'payout_claims' table for THIS user
  const channel = supabase
    .channel('payout-updates')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'payout_claims',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        if (payload.new.status === 'approved') {
          toast.success("PAYOUT APPROVED!", { 
            description: "Your winnings have been added to your balance.",
            duration: 10000 
          });
          // Refresh dashboard data
          fetchScores(user.id); 
        } else if (payload.new.status === 'rejected') {
          toast.error("Claim Rejected", { 
            description: "Please check your proof and re-upload." 
          });
        }
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [user, fetchScores]);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Loader2 className="animate-spin text-yellow-500 mb-4 mx-auto" size={48} />
        <p className="text-slate-500 font-black tracking-[0.3em] uppercase text-xs">Syncing Performance</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-16">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h1 className="text-5xl font-black tracking-tighter italic uppercase text-white leading-none">
              Player <span className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Dashboard</span>
            </h1>
            <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Impact ID: {user.email}</p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            {/* ADMIN BUTTON - Only visible to admins */}
            {user?.user_metadata?.is_admin === true && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <Link to="/admin">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-yellow-500 text-slate-900 border border-yellow-400 px-6 py-3 rounded-full transition-all cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.2)] group"
                  >
                    <ShieldCheck size={18} className="animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Admin Panel</span>
                  </motion.button>
                </Link>
              </motion.div>
            )}

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.info("Signing out...");
                supabase.auth.signOut().then(() => navigate('/'));
              }}
              className="group flex items-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer"
            >
              <LogOut size={18} className="text-slate-500 group-hover:text-red-500" />
              <span className="text-xs font-black uppercase tracking-widest group-hover:text-red-500">Sign Out</span>
            </motion.button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              title: 'Your Plan', 
              val: 'Pro Impact Member', 
              icon: CreditCard, 
              color: 'blue', 
              meta: user.user_metadata.subscription_status || 'Inactive',
              action: () => navigate('/subscribe')
            },
            { 
              title: 'Active Charity', 
              val: user.user_metadata.selected_charity || 'Not Linked', 
              icon: Heart, 
              color: 'red', 
              meta: '10% Donation per Draw' 
            },
            { 
              title: 'Net Winnings', 
              val: '$0.00', 
              icon: Award, 
              color: 'yellow', 
              meta: 'Payouts Processed: 0' 
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] hover:border-${item.color}-500/40 transition-all group relative overflow-hidden`}
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-3 bg-${item.color}-500/10 rounded-2xl text-${item.color}-500 group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon size={24} />
                </div>
                {item.meta && item.color !== 'yellow' && (
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${item.meta === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-slate-400'}`}>
                    {item.meta}
                  </span>
                )}
              </div>
              <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.title}</h3>
              <p className={`text-2xl font-black text-white mb-6 truncate ${item.color === 'yellow' ? 'text-4xl' : ''}`}>{item.val}</p>
              {item.action && (
                <button 
                  onClick={item.action}
                  className="w-full flex justify-between items-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all group/btn cursor-pointer"
                >
                  <span className="font-black text-[10px] uppercase tracking-widest">Manage Settings</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
              {item.color === 'red' && <p className="text-red-400 text-[9px] font-black uppercase tracking-widest">{item.meta}</p>}
              {item.color === 'yellow' && <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{item.meta}</p>}
            </motion.div>
          ))}
        </div>

        {/* Action Center */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Recent <span className="text-yellow-500">Scores</span></h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Rolling 5 System — Latest Data Only</p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <input 
                  type="number" 
                  min="1" max="45" 
                  placeholder="1-45"
                  className="bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 w-full md:w-32 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-black text-2xl text-center text-yellow-500"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitScore}
                  disabled={isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-800 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-yellow-500/20 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} strokeWidth={3} />}
                  Add Round
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <AnimatePresence mode='popLayout'>
                {scores.length > 0 ? (
                  scores.map((s, index) => (
                    <motion.div 
                      key={s.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative group bg-white/5 border border-white/5 p-8 rounded-[2rem] text-center hover:bg-white/10 transition-all overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500/10 group-hover:bg-yellow-500 transition-colors duration-500" />
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Round {scores.length - index}</p>
                      <p className="text-5xl font-black text-white group-hover:text-yellow-500 transition-colors duration-500">{s.score}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                    <Target className="mx-auto text-slate-800 mb-4" size={48} />
                    <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-xs">No active scores in system</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Winner Verification Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-10 rounded-[3rem] flex flex-col justify-center items-center text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/30 group-hover:bg-green-500 transition-all duration-700" />
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-8 border border-green-500/30 shadow-2xl shadow-green-500/10"
            >
              <UploadCloud className="text-green-400" size={32} />
            </motion.div>
            <h3 className="text-xl font-black text-white mb-3 uppercase italic tracking-tighter">Winner Verification</h3>
            <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed px-4">
              Won recently? Upload your golf platform screenshot to trigger your payout and charity boost.
            </p>
            
            <label className="w-full cursor-pointer">
              <input type="file" className="hidden" accept="image/*" onChange={handleUploadProof} disabled={uploading} />
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-600 hover:bg-green-500 text-white font-black uppercase py-5 rounded-2xl transition-all shadow-2xl shadow-green-900/40 tracking-widest flex items-center justify-center gap-2"
              >
                {uploading ? <Loader2 className="animate-spin" size={20} /> : 'Claim Payout'}
              </motion.div>
            </label>
            <p className="text-[9px] text-slate-500 font-black mt-6 uppercase tracking-widest opacity-50">Verified PNG/JPG up to 5MB</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}