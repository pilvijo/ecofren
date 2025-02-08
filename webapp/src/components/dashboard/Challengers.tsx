import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { challengers } from '../../data/dashboard';
import CollapsibleSection from './CollapsibleSection';

export default function Challengers() {
  return (
    <CollapsibleSection title="Challengers">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {challengers.map((challenger) => (
          <div 
            key={challenger.id} 
            className="rounded-xl bg-[#1a1b2e] p-4 hover:bg-[#2a2b3e] transition-all cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={challenger.image} 
                alt={challenger.name} 
                className="w-full h-32 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <h3 className="text-sm font-medium my-2">{challenger.name}</h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>weight {challenger.weight}</span>
              <span>{challenger.days}d</span>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}