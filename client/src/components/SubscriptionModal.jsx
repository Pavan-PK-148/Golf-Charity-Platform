export default function SubscriptionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-4xl w-full p-8 relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-2">Choose Your Impact </h2>
        <p className="text-slate-400 mb-8">Every subscription fuels the prize pool and your selected charity[cite: 76, 77].</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Monthly Plan */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
            <h3 className="text-xl font-bold mb-2">Monthly Pro</h3>
            <p className="text-4xl font-extrabold mb-6">$19<span className="text-sm font-normal text-slate-500">/mo</span></p>
            <ul className="text-sm text-slate-400 space-y-3 mb-8">
              <li>• Full access to Monthly Draws [cite: 14]</li>
              <li>• Rolling 5 Score Tracking [cite: 48]</li>
              <li>• 10% Charity Contribution [cite: 77]</li>
            </ul>
            <button className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-500">Subscribe Monthly</button>
          </div>

          {/* Yearly Plan */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-yellow-500/50 relative">
            <span className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-1 rounded-full uppercase">Best Value</span>
            <h3 className="text-xl font-bold mb-2">Yearly Legend</h3>
            <p className="text-4xl font-extrabold mb-6">$190<span className="text-sm font-normal text-slate-500">/yr</span></p>
            <ul className="text-sm text-slate-400 space-y-3 mb-8">
              <li>• 2 Months Free [cite: 31]</li>
              <li>• Enhanced Charity Profile [cite: 82]</li>
              <li>• All Monthly Draw Entries [cite: 14]</li>
            </ul>
            <button className="w-full bg-yellow-500 text-slate-900 py-3 rounded-xl font-bold hover:bg-yellow-400">Subscribe Yearly</button>
          </div>
        </div>
        <button onClick={onClose} className="mt-6 text-slate-500 text-sm hover:text-white underline w-full">I'll do this later</button>
      </div>
    </div>
  );
}