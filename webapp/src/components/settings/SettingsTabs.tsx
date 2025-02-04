import { Tab } from '@headlessui/react'
import { User } from '@supabase/supabase-js'
import GeneralTab from './tabs/GeneralTab'
import AccountTab from './tabs/AccountTab'
import WalletTab from './tabs/WalletTab'

interface SettingsTabsProps {
  user: User | null
  onLogout: () => Promise<void>
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingsTabs({ user, onLogout }: SettingsTabsProps) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 border-b border-[#1a1b2e] bg-[#0c0c1d]/50 px-6">
        {['General', 'Account', 'Wallet'].map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'py-3 px-4 text-sm font-medium transition-all duration-200',
                'focus:outline-none',
                selected
                  ? 'border-b-2 border-[#627eea] text-[#627eea]'
                  : 'text-gray-400 hover:text-gray-300 hover:border-b-2 hover:border-gray-700'
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="px-6 py-8 bg-[#0c0c1d]">
        <Tab.Panel>
          <GeneralTab />
        </Tab.Panel>
        <Tab.Panel>
          <AccountTab user={user} onLogout={onLogout} />
        </Tab.Panel>
        <Tab.Panel>
          <WalletTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}