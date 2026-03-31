import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft, Medal, Crown } from 'lucide-react';

export default function Leaderboard() {
  const topPlayers = [
    { rank: 1, name: "Alpha_Golfer", score: 42, impact: "$1,200", badge: Crown },
    { rank: 2, name: "Stableford_King", score: 40, impact: "$950", badge: Medal },
    { rank: 3, name: "Pavan_16", score: 39, impact: "$800", badge: Medal },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-all font-black uppercase text-[10px] tracking-widest mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Terminal
        </Link>

        <div className="text-center mb-16">
          <Trophy className="text-yellow-500 mx-auto mb-6" size={48} />
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">The <span className="text-yellow-500">Apex</span></h1>
          <p className="text-slate-500 uppercase font-black text-[10px] tracking-[0.3em]">Performance & Philanthropy Rankings</p>
        </div>

        <div className="space-y-4">
          {topPlayers.map((player) => (
            <div key={player.rank} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-6 hover:bg-white/10 transition-all">
              <span className="text-2xl font-black italic text-slate-700 w-8">0{player.rank}</span>
              <div className="flex-1">
                <p className="font-black uppercase italic text-lg tracking-tight">{player.name}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase">Impact Score: {player.impact}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-yellow-500">{player.score}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase">Stableford Avg</p>
              </div>
              <player.badge className={player.rank === 1 ? "text-yellow-500" : "text-slate-400"} size={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}