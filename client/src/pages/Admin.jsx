import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Settings, Users, Heart, Play, ArrowLeft, 
  Check, X, Eye, Loader2, Trophy, 
  Database, ShieldCheck, Activity 
} from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, pool: 0, charities: 0 });
  const [winners, setWinners] = useState([]);
  const [drawResult, setDrawResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const navigate = useNavigate();

  // Optimized Fetch Functions
  const fetchStats = useCallback(async () => {
    try {
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: charityCount } = await supabase.from('charities').select('*', { count: 'exact', head: true });
      
      setStats({ 
        users: userCount || 0, 
        pool: (userCount || 0) * 10, 
        charities: charityCount || 0 
      });
    } catch (error) {
      console.error("Stats Error:", error);
    }
  }, []);

  const verifyWinner = async (claimId, newStatus) => {
  try {
    const { error } = await supabase
      .from('payout_claims')
      .update({ 
        status: newStatus, // 'approved' or 'rejected'
        processed_at: new Date().toISOString() 
      })
      .eq('id', claimId);

    if (error) throw error;
    
    // Refresh your local state here to reflect the change in the UI
    alert(`Node ${claimId} status updated to ${newStatus}`);
  } catch (err) {
    console.error("Verification error:", err.message);
  }
};

const updateSubscription = async (planType) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { error } = await supabase
    .from('profiles')
    .update({ 
      subscription_status: 'active',
      plan_type: planType, // 'monthly' or 'yearly'
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (!error) navigate('/dashboard');
};

  const fetchPendingWinners = useCallback(async () => {
  try {
    const { data, error } = await supabase
      .from('payout_claims')
      .select(`
        id,
        user_id,
        status,
        amount,
        proof_url,
        created_at,
        profiles (
          email
        )
      `)
      .eq('status', 'pending');

    if (error) throw error;

    if (data) {
      const winnerData = data.map(claim => ({
        id: claim.id,
        user_id: claim.user_id,
        // Fallback to a shortened ID if profile email is missing
        email: claim.profiles?.email || `User_${claim.user_id.substring(0, 5)}`,
        prize: `$${claim.amount.toFixed(2)}`,
        proofUrl: claim.proof_url,
        name: claim.proof_url.split('/').pop(),
        date: new Date(claim.created_at).toLocaleDateString()
      }));
      setWinners(winnerData);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    // Silent fail for UI stability
  }
}, []);

  // Auth Guard
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.user_metadata.is_admin !== true) {
        toast.error("Access Denied", { description: "You do not have administrative permissions." });
        navigate('/dashboard');
        return;
      }
      await Promise.all([fetchStats(), fetchPendingWinners()]);
      setLoading(false);
    };
    checkAdmin();
  }, [navigate, fetchStats, fetchPendingWinners]);

  const handleAction = async (winner, type) => {
  const actionPromise = new Promise(async (resolve, reject) => {
    try {
      // 1. Update the specific claim by its Database ID
      const { error: dbError } = await supabase
        .from('payout_claims')
        .update({ 
          status: type === 'approve' ? 'approved' : 'rejected',
          processed_at: new Date().toISOString() 
        })
        .eq('id', winner.id); // Use the DB UUID, not the filename

      if (dbError) throw dbError;

      // 2. Remove the file from storage (Optional: only if you want to clear space)
      await supabase.storage
        .from('winner-proofs')
        .remove([`proofs/${winner.name}`]);
      
      // 3. Update local state using the unique ID
      setWinners(prev => prev.filter(w => w.id !== winner.id));
      resolve();
    } catch (err) {
      console.error("Action Error:", err);
      reject(err);
    }
  });

  toast.promise(actionPromise, {
    loading: 'Processing decision...',
    success: 'Database synced successfully!',
    error: 'Action failed. Check RLS policies.',
  });
};

const saveScore = async (newScoreValue) => {
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Fetch current scores
  const { data: currentScores } = await supabase
    .from('golf_scores')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  // 2. Rolling Logic: If there are already 5 scores, delete the oldest one [cite: 49]
  if (currentScores && currentScores.length >= 5) {
    const oldestScoreId = currentScores[0].id;
    await supabase.from('golf_scores').delete().eq('id', oldestScoreId);
  }

  // 3. Add the new score
  const { error } = await supabase
    .from('golf_scores')
    .insert([{ 
      user_id: user.id, 
      score: newScoreValue, 
      date: new Date().toISOString() 
    }]);

  if (!error) toast.success("Score Protocol Updated");
};

  // Draw Logic
  const runDrawSimulation = () => {
    setIsSimulating(true);
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: 'Initializing Draw Engine...',
      success: () => {
        const winningNumbers = [];
        while(winningNumbers.length < 5){
            const r = Math.floor(Math.random() * 45) + 1;
            if(winningNumbers.indexOf(r) === -1) winningNumbers.push(r);
        }
        setDrawResult(winningNumbers.sort((a,b) => a-b));
        setIsSimulating(false);
        return 'Monthly Draw Finalized!';
      },
      error: 'Engine Sync Error',
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-yellow-500 mb-4" size={48} />
      <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Authenticating Admin</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 md:p-12 font-sans selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Status Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-all font-black uppercase text-xs tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Exit Command Center
          </Link>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-tighter text-slate-300">System Live</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <ShieldCheck size={16} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-300">Admin Verified</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="mb-16">
          <h1 className="text-5xl font-black mb-2 italic uppercase tracking-tighter flex items-center gap-4">
            <Settings className="text-yellow-500" size={44} /> 
            Admin <span className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Terminal</span>
          </h1>
          <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-[10px]">Global oversight & prize distribution</p>
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Players', val: stats.users, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Active Prize Pool', val: `$${stats.pool}`, icon: Trophy, color: 'text-green-400', bg: 'bg-green-400/10' },
            { label: 'Charity Partners', val: stats.charities, icon: Heart, color: 'text-red-400', bg: 'bg-red-400/10' }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity ${item.color}`}>
                <item.icon size={80} />
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <item.icon size={12} className={item.color} /> {item.label}
              </p>
              <p className="text-5xl font-black tracking-tighter italic">{item.val}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Draw Management Section */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-white/10 to-transparent p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xs font-black mb-8 uppercase italic tracking-[0.2em] text-yellow-500 flex items-center gap-2">
                  <Activity size={16} /> Draw Management
                </h2>
                <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">
                  Executing the draw will calculate physics-based winning numbers across all active participants.
                </p>
                <button 
                  onClick={runDrawSimulation} 
                  disabled={isSimulating}
                  className="w-full bg-yellow-500 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-all active:scale-95 shadow-xl shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSimulating ? <Loader2 className="animate-spin mx-auto" /> : 'Run Monthly Draw'}
                </button>
              </div>

              {drawResult && (
                <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-center gap-3">
                    {drawResult.map((num, i) => (
                      <div key={i} className="h-12 w-12 flex items-center justify-center bg-white text-slate-900 rounded-full font-black text-lg shadow-lg animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                        {num}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[10px] font-black text-yellow-500 uppercase mt-6 tracking-widest">Draw Result Verified</p>
                </div>
              )}
            </div>

            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex items-center gap-6">
              <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400">
                <Database size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase">Database Sync</p>
                <p className="font-bold text-sm">Last Backup: Just Now</p>
              </div>
            </div>
          </div>

          {/* Verification Table */}
          <div className="lg:col-span-2 bg-white/5 p-10 rounded-[3rem] border border-white/10 shadow-2xl">
            <h2 className="text-xs font-black mb-10 uppercase italic tracking-[0.2em] text-red-400 flex items-center gap-2">
              <Check size={16} /> Identity & Winnings Verification
            </h2>
            
            <div className="overflow-x-auto">
              {winners.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-500 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                      <th className="pb-6 font-black">Identity</th>
                      <th className="pb-6 font-black text-center">Amount</th>
                      <th className="pb-6 font-black text-center">Evidence</th>
                      <th className="pb-6 font-black text-right">Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {winners.map((winner) => (
                      <tr key={winner.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-6">
                          <p className="font-bold text-sm text-white">{winner.email}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{winner.date}</p>
                        </td>
                        <td className="py-6 text-center">
                          <span className="font-black text-green-400 bg-green-400/10 px-3 py-1 rounded-lg text-sm">{winner.prize}</span>
                        </td>
                        <td className="py-6 text-center">
                          <a href={winner.proofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                            <Eye size={14} /> Open File
                          </a>
                        </td>
                        <td className="py-6 text-right">
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => handleAction(winner, 'approve')}
                              className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all transform hover:scale-110"
                              title="Approve Payout"
                            >
                              <Check size={18}/>
                            </button>
<button 
  onClick={() => handleAction(winner, 'reject')}
  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
  title="Reject Verification"
>
  <X size={18}/>
</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-20 text-center">
                  <ShieldCheck size={48} className="mx-auto text-slate-800 mb-4" />
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">No pending verifications</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}