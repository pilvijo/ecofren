import { User } from '@supabase/supabase-js';
import CollapsibleSection from './CollapsibleSection';
import { cryptoAssets } from '../../data/dashboard';

interface SidebarProps {
  user: User;
  points: number;
}

export default function Sidebar({ user, points }: SidebarProps) {
  return (
    <div className="lg:col-span-3 space-y-4">
      <CollapsibleSection title="Summary">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">points</span>
          <span className="font-semibold">{points.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Your Assets">
        <div className="space-y-4">
          {cryptoAssets.map((asset) => (
            <div 
              key={asset.id} 
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[#2a2b3e] transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <img src={asset.icon} alt={asset.name} className="w-6 h-6" />
                <div>
                  <p className="font-medium">{asset.symbol}</p>
                  <p className="text-sm text-gray-400">{asset.amount.toFixed(4)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${asset.value.toFixed(2)}</p>
                <p className={`text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Your Ecofren Profile">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-[#627eea]/20 flex items-center justify-center">
              <span className="text-lg font-semibold">{user.email?.[0].toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-gray-400">Level 12</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Experience</span>
              <span>2,450 / 3,000</span>
            </div>
            <div className="h-2 bg-[#2a2b3e] rounded-full">
              <div className="h-full w-4/5 bg-[#627eea] rounded-full"></div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}