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

  return <div id="game-container" />
}
