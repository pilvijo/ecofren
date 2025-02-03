import Phaser from 'phaser';
import { updatePlayerMovement } from '../mechanics/topDown';
import { createPlayerAnimations } from '../mechanics/playerAnimations';
import { createPlayer, PlayerCreationResult } from '../mechanics/playerFactory';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private keys!: {
        w: Phaser.Input.Keyboard.Key;
        a: Phaser.Input.Keyboard.Key;
        s: Phaser.Input.Keyboard.Key;
        d: Phaser.Input.Keyboard.Key;
    };
    private speed: number = 200;

    constructor() {
        super({ key: 'TopDownScene' });
    }

    create(): void {
        createPlayerAnimations(this);
        const playerData: PlayerCreationResult = createPlayer(this, 400, 300, 'player', 0);
        this.player = playerData.player;
        this.keys = playerData.keys;
    }

    update(): void {
        updatePlayerMovement(this.player, this.keys, this.speed);
    }
}
