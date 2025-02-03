// src/components/GameCanvas.tsx
import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { gameConfig } from '../game/config'

export default function GameCanvas() {
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    gameRef.current = new Phaser.Game(gameConfig)
    return () => {
      gameRef.current?.destroy(true)
    }
  }, [])

  return (
    <main 
        className="w-screen h-screen flex items-center justify-center"
        style={{ 
            backgroundImage: "url('/assets/wallpaper.webp')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}
    >
        <div 
            id="game-container" 
            className="rounded-md border-8 border-green-700 outline outline-2 outline-green-800 shadow-lg"
        />
    </main>
  );
}
