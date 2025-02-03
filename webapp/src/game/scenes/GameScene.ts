import Phaser from 'phaser';
import { MovementKeys, updatePlayerMovement } from '../mechanics/TopDown';

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
    if (!this.anims.exists('walk-down')) {
      this.anims.create({
        key: 'walk-down',
        frames: [
          { key: 'player', frame: 1 },
          { key: 'player', frame: 2 },
          { key: 'player', frame: 3 },
          { key: 'player', frame: 0 }
        ],
        frameRate: 10,
        repeat: -1
      });
    }
    if (!this.anims.exists('walk-left')) {
      this.anims.create({
        key: 'walk-left',
        frames: [
          { key: 'player', frame: 5 },
          { key: 'player', frame: 6 },
          { key: 'player', frame: 7 },
          { key: 'player', frame: 4 }
        ],
        frameRate: 10,
        repeat: -1
      });
    }
    if (!this.anims.exists('walk-right')) {
      this.anims.create({
        key: 'walk-right',
        frames: [
          { key: 'player', frame: 9 },
          { key: 'player', frame: 10 },
          { key: 'player', frame: 11 },
          { key: 'player', frame: 8 }
        ],
        frameRate: 10,
        repeat: -1
      });
    }
    if (!this.anims.exists('walk-up')) {
      this.anims.create({
        key: 'walk-up',
        frames: [
          { key: 'player', frame: 13 },
          { key: 'player', frame: 14 },
          { key: 'player', frame: 15 },
          { key: 'player', frame: 12 }
        ],
        frameRate: 10,
        repeat: -1
      });
    }
    this.player = this.physics.add.sprite(400, 300, 'player', 0);
    this.player.setCollideWorldBounds(true);
    this.wKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update(): void {
    const keys: MovementKeys = {
      w: this.wKey,
      a: this.aKey,
      s: this.sKey,
      d: this.dKey
    };
    updatePlayerMovement(this.player, keys, this.speed);
  }
}
