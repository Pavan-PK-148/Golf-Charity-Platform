import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Subscribe from './pages/Subscribe';
import { Toaster } from 'sonner';
import HowItWorks from './pages/HowItWorks';
import CharityPartners from './pages/CharityPartners';
import TermsOfPlay from './pages/Terms';
import Leaderboard from './pages/LeaderBoard';
import Protocols from './pages/Protocols';

function App() {
  return (
    
    <Router>
      <Toaster position="top-center" expand={false} richColors theme="dark" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        {/* We will build Dashboard tomorrow */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/charity-partners" element={<CharityPartners />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/terms" element={<TermsOfPlay />} />
        <Route path="/protocols" element={<Protocols />} />
      </Routes>
    </Router>
  );
}
export default App;