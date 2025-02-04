export default function GeneralTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-base font-medium text-gray-200">Game Settings</h4>
        <div className="space-y-4">
          {[
            { label: 'Sound Effects', id: 'sound' },
            { label: 'Music', id: 'music' },
            { label: 'Notifications', id: 'notifications' }
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between bg-[#1a1b2e] p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-300">{setting.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#627eea]/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#627eea]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}