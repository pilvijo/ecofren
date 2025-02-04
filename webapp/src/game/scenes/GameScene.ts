import Phaser from 'phaser';
import { updatePlayerMovement } from '../mechanics/player/topDown';
import { createPlayerAnimations } from '../mechanics/player/playerAnimations';
import { createPlayer, PlayerCreationResult } from '../mechanics/player/playerFactory';
import apartmentLevelData, { TILE_HEIGHT, TILE_WIDTH } from '../constants/apartmentLevelData';

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
        const map = this.make.tilemap({
            data: apartmentLevelData,
            tileWidth: TILE_WIDTH,
            tileHeight: TILE_HEIGHT
          });

        const tileset = map.addTilesetImage("tileset", "tileset")!;
        const background = map.createLayer(0, tileset, 0, 0)!;

        createPlayerAnimations(this);
        const playerData: PlayerCreationResult = createPlayer(this, 400, 300, 'player', 0);
        this.player = playerData.player;
        this.keys = playerData.keys;
    }

    update(): void {
        updatePlayerMovement(this.player, this.keys, this.speed);
    }
}
