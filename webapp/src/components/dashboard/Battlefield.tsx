import { activities, Activity } from '../../data/dashboard';
import { ChatIcon, QuestionIcon, ActivityIcon, TruthIcon } from './icons/ActivityIcons';

function getIconComponent(activity: Activity) {
  const props = { className: "h-6 w-6" };
  
  switch (activity.iconType) {
    case 'chat':
      return <ChatIcon {...props} />;
    case 'question':
      return <QuestionIcon {...props} />;
    case 'activity':
      return <ActivityIcon {...props} />;
    case 'truth':
      return <TruthIcon {...props} />;
    default:
      return null;
  }
}

export default function Battlefield() {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Battlefield</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl bg-[#1a1b2e] p-4 hover:bg-[#2a2b3e] transition-colors cursor-pointer"
          >
            <div className="flex items-start space-x-4 mb-4 sm:mb-0">
              <div className="rounded-full bg-[#627eea]/20 p-2 shrink-0">
                {getIconComponent(activity)}
              </div>
              <div>
                <h3 className="font-medium mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-400">{activity.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-14 sm:ml-0">
              <span className="text-[#627eea]">+/-</span>
              <span>{activity.points}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}