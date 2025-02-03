import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

export const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container', // The div in GameCanvas.js
  scene: [BootScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};
