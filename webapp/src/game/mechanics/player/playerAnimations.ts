import Phaser from 'phaser';

export function createPlayerAnimations(scene: Phaser.Scene): void {
  if (!scene.anims.exists('walk-down')) {
    scene.anims.create({
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
  if (!scene.anims.exists('walk-left')) {
    scene.anims.create({
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
  if (!scene.anims.exists('walk-right')) {
    scene.anims.create({
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
  if (!scene.anims.exists('walk-up')) {
    scene.anims.create({
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
}
