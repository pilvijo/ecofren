import { User } from '@supabase/supabase-js'

interface AccountTabProps {
  user: User | null
  onLogout: () => Promise<void>
}

export default function AccountTab({ user, onLogout }: AccountTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-[#1a1b2e] p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-200 mb-2">Account Information</h4>
          <p className="text-sm text-gray-400">
            Email: {user?.email}
          </p>
        </div>

        <div className="bg-[#1a1b2e] p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-200 mb-3">Security</h4>
          <button
            type="button"
            className="w-full px-4 py-2 text-sm font-medium text-gray-300 bg-[#2a2b3e] hover:bg-[#3a3b4e] rounded-lg border border-gray-700 transition-colors duration-200"
          >
            Change Password
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  )
}