import { useEffect, useState } from 'react'
import { injected, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import supabase from '../../../utils/supabase'
import useAuth from '../../../hooks/useAuth'

export default function WalletTab() {
  const { user } = useAuth()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const [attachedWallet, setAttachedWallet] = useState<string | null>(null)

  useEffect(() => {
    fetchWalletAddress()
  }, [user])

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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-[#1a1b2e] p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-200 mb-3">Wallet Connection</h4>
          {attachedWallet ? (
            <div className="space-y-3">
              <div className="bg-[#2a2b3e] p-3 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">
                  Connected: {attachedWallet.slice(0, 6)}...{attachedWallet.slice(-4)}
                </p>
              </div>
              <button
                onClick={detachWallet}
                className="w-full px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {isConnected ? (
                <button
                  onClick={attachWallet}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-[#627eea] hover:bg-[#4c63bb] rounded-lg transition-colors duration-200"
                >
                  Link Wallet
                </button>
              ) : (
                <button
                  onClick={() => connect({ connector: injected() })}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-[#627eea] hover:bg-[#4c63bb] rounded-lg transition-colors duration-200"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}