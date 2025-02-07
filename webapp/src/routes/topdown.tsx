import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Phaser from 'phaser'
import { gameConfig } from '../game/config'
import ChatModal from '../components/game/ChatModal'
import SettingsMenu from '../components/settings/SettingsMenu'
import { useAccount } from 'wagmi'

export default function GameCanvas() {
  const gameRef = useRef<Phaser.Game | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { problemId } = useParams()
  const navigate = useNavigate()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isChatOpen)
      return;
    if (!isConnected) {
      navigate('/problem-selection')
      return
    }

    gameRef.current = new Phaser.Game(gameConfig)
    return () => {
      gameRef.current?.destroy(true)
    }
  }, [isConnected, navigate, isChatOpen])

  useEffect(() => {
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene('TopDownScene') as any
      if (scene && scene.keys) {
        Object.values(scene.keys).forEach((key: any) => {
          key.enabled = !isChatOpen
        })
      }
    }
  }, [isChatOpen])

  if (!isConnected) {
    return (
      <div className="h-screen bg-[#0c0c1d] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 p-8 bg-[#1a1b2e] rounded-xl border border-[#627eea]/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Required</h2>
          <p className="text-gray-300 mb-6">
            Please connect your wallet to access the game. Your progress and achievements will be stored securely on the blockchain.
          </p>
          <button
            onClick={() => navigate('/problem-selection')}
            className="w-full bg-[#627eea] text-white py-3 px-4 rounded-lg hover:bg-[#4c63bb] transition-colors"
          >
            Return to Mission Selection
          </button>
        </div>
      </div>
    )
  }

  return (
    <main 
      className="w-screen h-screen flex items-center justify-center relative"
      style={{ 
        backgroundImage: "url('/assets/wallpaper.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-400 hover:text-[#627eea] bg-[#1a1b2e] hover:bg-[#2a2b3e] transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Top right buttons */}
      <div className="fixed top-6 right-6 flex items-center space-x-4 z-50">
        {/* Chat toggle button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="rounded-lg p-2 text-gray-400 hover:text-[#627eea] bg-[#1a1b2e] hover:bg-[#2a2b3e] transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Settings Menu */}
        <div className="bg-[#1a1b2e] rounded-lg">
          <SettingsMenu />
        </div>
      </div>

      {!isChatOpen && (
        <div 
          id="game-container" 
          className="rounded-md border-8 border-green-700 outline outline-2 outline-green-800 shadow-lg"
        />
      )}

      <ChatModal 
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        problemId={problemId}
      />
    </main>
  )
}