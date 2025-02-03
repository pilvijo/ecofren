import Phaser from 'phaser';

export interface PlayerCreationResult {
    player: Phaser.Physics.Arcade.Sprite;
    keys: {
        w: Phaser.Input.Keyboard.Key;
        a: Phaser.Input.Keyboard.Key;
        s: Phaser.Input.Keyboard.Key;
        d: Phaser.Input.Keyboard.Key;
    };
}

export function createPlayer(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    initialFrame: number
): PlayerCreationResult {
    const player = scene.physics.add.sprite(x, y, texture, initialFrame);
    player.setCollideWorldBounds(true);
    const w = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    const a = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    const s = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    const d = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    return { player, keys: { w, a, s, d } };
}
