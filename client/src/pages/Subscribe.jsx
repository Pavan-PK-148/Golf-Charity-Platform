import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Check, Heart, Zap, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (plan) => {
  setLoading(true);
  const toastId = toast.loading("Processing secure payment...", { id: 'sub-toast' });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Update Auth Metadata (For the session)
    const { error: authError } = await supabase.auth.updateUser({
      data: { 
        subscription_status: 'active', 
        plan_type: plan 
      }
    });
    if (authError) throw authError;

    // 2. Update the Profiles Table (For Database RLS & Persistence)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        subscription_status: 'active',
        plan_type: plan,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (profileError) throw profileError;

    toast.success("Welcome to the Inner Circle!", { 
      id: toastId,
      description: `Your ${plan} impact is now live.` 
    });
    
    navigate('/dashboard');
  } catch (error) {
    toast.error("Subscription failed: " + error.message, { id: toastId });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-white mb-12 font-bold uppercase text-xs tracking-widest transition-colors">
          <ArrowLeft size={16} /> Return to Dashboard
        </button>

        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6 italic uppercase tracking-tighter">
            Select Your <span className="text-yellow-500">Impact</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            10% of every subscription funds your chosen charity. The rest fuels the prize pool you compete for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan cards remain the same visually but now trigger handleSubscribe with toasts */}
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-blue-500/50 transition-all flex flex-col">
            <Heart className="text-blue-400 mb-6" size={40} />
            <h2 className="text-2xl font-black uppercase italic mb-2">Monthly Pro</h2>
            <p className="text-5xl font-black mb-8">$19<span className="text-sm text-slate-500 uppercase tracking-widest font-bold">/mo</span></p>
            <ul className="space-y-4 mb-12 flex-1">
              {['Monthly Draw Access', 'Rolling 5 Analytics', 'Charity Donation Included'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-bold text-sm uppercase tracking-tight">
                  <div className="h-1.5 w-1.5 bg-blue-400 rounded-full" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe('monthly')} disabled={loading} className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest transition-all cursor-pointer">
              Join Monthly
            </button>
          </div>

          <div className="bg-white/5 border-2 border-yellow-500/50 p-10 rounded-[3rem] relative flex flex-col overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 px-6 py-2 rounded-bl-3xl font-black uppercase text-[10px] tracking-widest">Best Value</div>
            <Zap className="text-yellow-500 mb-6" size={40} />
            <h2 className="text-2xl font-black uppercase italic mb-2">Yearly Legend</h2>
            <p className="text-5xl font-black mb-8">$190<span className="text-sm text-slate-500 uppercase tracking-widest font-bold">/yr</span></p>
            <ul className="space-y-4 mb-12 flex-1">
              {['2 Months Free Membership', 'Enhanced Charity Profile', 'All Monthly Draw Access'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-bold text-sm uppercase tracking-tight">
                  <div className="h-1.5 w-1.5 bg-yellow-500 rounded-full" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe('yearly')} disabled={loading} className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-yellow-500/20 cursor-pointer">
              Claim Legacy Tier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}