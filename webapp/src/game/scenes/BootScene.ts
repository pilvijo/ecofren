import Phaser from 'phaser';

const FRAME_SIZE = 72;

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.spritesheet('player', '/assets/sprites/player.png', {
      frameWidth: FRAME_SIZE,
      frameHeight: FRAME_SIZE,
    });
  }

  create(): void {
    this.scene.start('TopDownScene');
  }
}
