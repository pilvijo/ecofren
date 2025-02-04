import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import SettingsMenu from '../settings/SettingsMenu'
import WalletModal from '../WalletModal'

interface NavigationProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  user: User | null
}

const navigation = [
  { name: 'Game', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Community', href: '#' },
  { name: 'About', href: '#' },
]

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen, user }: NavigationProps) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const { isConnected } = useAccount()

  const handlePlayClick = (e: React.MouseEvent) => {
    if (!isConnected) {
      e.preventDefault()
      setIsWalletModalOpen(true)
    }
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Ecofren</span>
              <img
                className="h-12 w-auto"
                src="/assets/logo.png"
                alt="Ecofren"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-[#627eea] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
            {user ? (
              <>
                <SettingsMenu />
                <a
                  href="/problem-selection"
                  onClick={handlePlayClick}
                  className="inline-flex items-center rounded-lg bg-[#627eea] px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[#4c63bb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627eea] transition-all hover:scale-105"
                >
                  Play Now
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                  </svg>
                </a>
              </>
            ) : (
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-[#627eea] transition-colors"
              >
                Log in <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0c0c1d] px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Ecofren</span>
                <img
                  className="h-8 w-auto"
                  src="/assets/logo.png"
                  alt="Ecofren"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <>
                      <a
                        href="/problem-selection"
                        onClick={handlePlayClick}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                      >
                        Play Now
                      </a>
                      <div className="-mx-3 block rounded-lg px-3 py-2.5">
                        <SettingsMenu />
                      </div>
                    </>
                  ) : (
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                    >
                      Log in
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <WalletModal isOpen={isWalletModalOpen} setIsOpen={setIsWalletModalOpen} />
    </>
  )
}