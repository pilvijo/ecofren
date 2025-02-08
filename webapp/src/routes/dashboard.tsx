import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import PointsChart from '../components/dashboard/PointsChart';
import Challengers from '../components/dashboard/Challengers';
import Battlefield from '../components/dashboard/Battlefield';

export default function Dashboard() {
  const [points] = useState(21533.10);
  const [selectedPeriod, setSelectedPeriod] = useState('1W');
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0c0c1d] text-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Sidebar user={user} points={points} />
          <div className="lg:col-span-9 space-y-8">
            <PointsChart selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
            <Challengers />
            <Battlefield />
          </div>
        </div>
      </main>
    </div>
  );
}