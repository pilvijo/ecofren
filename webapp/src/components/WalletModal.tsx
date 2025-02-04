import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useConnect, injected } from 'wagmi'

interface WalletModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function WalletModal({ isOpen, setIsOpen }: WalletModalProps) {
  const { connect } = useConnect()

  return (
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#0c0c1d] p-6 shadow-xl transition-all border border-[#1a1b2e]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#627eea]/10 to-[#454a75]/10" />
                
                <div className="relative">
                  <Dialog.Title className="text-lg font-medium text-white mb-4">
                    Connect Your Wallet
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                      Please connect your wallet to access the game. Your progress and achievements will be stored securely on the blockchain.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => {
                        connect({ connector: injected() })
                        setIsOpen(false)
                      }}
                      className="w-full bg-[#627eea] text-white py-3 px-4 rounded-lg hover:bg-[#4c63bb] transition-colors"
                    >
                      Connect Metamask
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-[#1a1b2e] text-gray-300 py-3 px-4 rounded-lg border border-gray-700 hover:bg-[#2a2b3e] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}