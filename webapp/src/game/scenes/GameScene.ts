import Phaser from 'phaser';
import { updatePlayerMovement } from '../mechanics/topDown';
import { createPlayerAnimations } from '../mechanics/playerAnimations';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private wKey!: Phaser.Input.Keyboard.Key;
  private aKey!: Phaser.Input.Keyboard.Key;
  private sKey!: Phaser.Input.Keyboard.Key;
  private dKey!: Phaser.Input.Keyboard.Key;
  private speed: number = 200;

  constructor() {
    super({ key: 'TopDownScene' });
  }

  create(): void {
    createPlayerAnimations(this);
    
    this.player = this.physics.add.sprite(400, 300, 'player', 0);
    this.player.setCollideWorldBounds(true);
    this.wKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update(): void {
     updatePlayerMovement(this.player, {
      w: this.wKey,
      a: this.aKey,
      s: this.sKey,
      d: this.dKey
    }, this.speed);
  }
}
