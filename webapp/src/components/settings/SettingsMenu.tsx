import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import supabase from '../../utils/supabase'
import SettingsTabs from './SettingsTabs'

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full p-2 text-gray-400 hover:text-[#627eea] hover:bg-[#627eea]/10 transition-all duration-200"
      >
        <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#0c0c1d] shadow-2xl transition-all border border-[#1a1b2e]">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#627eea]/10 to-[#454a75]/10" />
                    <div className="relative flex items-center justify-between border-b border-[#1a1b2e] p-6">
                      <Dialog.Title className="text-lg font-semibold text-gray-200">
                        Settings
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <SettingsTabs user={user} onLogout={handleLogout} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}