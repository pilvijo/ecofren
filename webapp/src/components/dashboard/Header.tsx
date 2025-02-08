import { PlusIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate('/problem-selection');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0c0c1d]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg p-2 text-gray-400 hover:text-[#627eea] hover:bg-[#1a1b2e] transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <span className="ml-2 text-lg font-semibold hidden md:block">Ecofren Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}