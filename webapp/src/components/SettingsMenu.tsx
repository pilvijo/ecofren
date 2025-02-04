import { Fragment, useState } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { injected, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import supabase from '../utils/supabase'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const [attachedWallet, setAttachedWallet] = useState<string | null>(null)

  const fetchWalletAddress = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from("user_wallets")
      .select("wallet_address")
      .eq("user_id", user.id)
      .maybeSingle()

    if (!error && data) {
      setAttachedWallet(data.wallet_address)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
    navigate('/')
  }

  const attachWallet = async () => {
    if (!isConnected || !address || !user) return

    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign this message to verify ownership of your wallet.",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      const { error } = await supabase
        .from("user_wallets")
        .insert([{
          user_id: user.id,
          wallet_address: address,
        }])

      if (error) throw error

      setAttachedWallet(address)
    } catch (error) {
      console.error("Error linking wallet:", error)
    }
  }

  const detachWallet = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from("user_wallets")
        .delete()
        .eq("user_id", user.id)

      if (error) throw error

      setAttachedWallet(null)
      disconnect()
    } catch (error) {
      console.error("Error unlinking wallet:", error)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true)
          fetchWalletAddress()
        }}
        className="rounded-full p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
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
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-50" />
                    <div className="relative flex items-center justify-between border-b border-gray-200 p-6">
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        Settings
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <Tab.Group>
                    <Tab.List className="flex space-x-1 border-b border-gray-200 bg-gray-50 px-6">
                      {['General', 'Account', 'Wallet'].map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              'py-3 px-4 text-sm font-medium transition-all duration-200',
                              'focus:outline-none',
                              selected
                                ? 'border-b-2 border-green-500 text-green-600'
                                : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="px-6 py-8">
                      {/* General Settings Panel */}
                      <Tab.Panel className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="text-base font-medium text-gray-900">Game Settings</h4>
                          <div className="space-y-4">
                            {[
                              { label: 'Sound Effects', id: 'sound' },
                              { label: 'Music', id: 'music' },
                              { label: 'Notifications', id: 'notifications' }
                            ].map((setting) => (
                              <div key={setting.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Tab.Panel>

                      {/* Account Settings Panel */}
                      <Tab.Panel className="space-y-6">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Account Information</h4>
                            <p className="text-sm text-gray-600">
                              Email: {user?.email}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Security</h4>
                            <button
                              type="button"
                              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors duration-200"
                            >
                              Change Password
                            </button>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            Logout
                          </button>
                        </div>
                      </Tab.Panel>

                      {/* Wallet Settings Panel */}
                      <Tab.Panel className="space-y-6">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Wallet Connection</h4>
                            {attachedWallet ? (
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                  <p className="text-sm text-gray-600">
                                    Connected: {attachedWallet.slice(0, 6)}...{attachedWallet.slice(-4)}
                                  </p>
                                </div>
                                <button
                                  onClick={detachWallet}
                                  className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                >
                                  Disconnect Wallet
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {isConnected ? (
                                  <button
                                    onClick={attachWallet}
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                                  >
                                    Link Wallet
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => connect({ connector: injected() })}
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                                  >
                                    Connect Wallet
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}