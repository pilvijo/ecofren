import Phaser from 'phaser';

export interface MovementKeys {
  w: Phaser.Input.Keyboard.Key;
  a: Phaser.Input.Keyboard.Key;
  s: Phaser.Input.Keyboard.Key;
  d: Phaser.Input.Keyboard.Key;
}

export function updatePlayerMovement(
  player: Phaser.Physics.Arcade.Sprite,
  keys: MovementKeys,
  speed: number
): void {
  const direction = new Phaser.Math.Vector2(0, 0);
  if (keys.w.isDown) direction.y -= 1;
  if (keys.s.isDown) direction.y += 1;
  if (keys.a.isDown) direction.x -= 1;
  if (keys.d.isDown) direction.x += 1;
  if (direction.lengthSq() > 0) direction.normalize();

  player.setVelocity(direction.x * speed, direction.y * speed);

  if (direction.x === 0 && direction.y === 0) {
    player.anims.stop();
    player.setFrame(1);
  } else {
    if (Math.abs(direction.x) > Math.abs(direction.y)) {
      direction.x < 0
        ? player.anims.play('walk-left', true)
        : player.anims.play('walk-right', true);
    } else {
      direction.y < 0
        ? player.anims.play('walk-up', true)
        : player.anims.play('walk-down', true);
    }
  }
}
