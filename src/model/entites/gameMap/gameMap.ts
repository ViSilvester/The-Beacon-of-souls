import { KeybordController } from "../../../controllers/keyboardController.js";
import { Entity } from "../../engine/entity.js";
import { EzIO } from "../../engine/EzIO.js";
import { Vec2, Vec3 } from "../../engine/geometry.js";
import { Game } from "../../game/game.js";

export class GameMap extends Entity {

    height: number;
    width: number;
    tileset!: ImageBitmap;
    tileSize: Vec2;
    map: Array<Array<number>>
    pos: Vec2;

    constructor(pos: Vec2, width: number, height: number, tileSize: Vec2) {
        super();
        this.width = width;
        this.height = height;
        this.pos = pos;
        this.tileSize = tileSize;
        this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    }

    async create() {
        this.tileset = await EzIO.loadImageFromUrl("../../../assets/tileset.png");
    }

    update(game: Game): void {
        this.pos = game.camera;
    }

    render(game: Game): void {

        if (this.tileset instanceof ImageBitmap) {
            for (var i = 0; i < this.map.length; i++) {
                for (var j = 0; j < this.map.length; j++) {

                    var posx = i - this.pos.x;
                    var posy = j - this.pos.y;

                    game.draw.drawImage(
                        this.tileset,
                        new Vec2(
                            ((game.draw.width / 2) - this.tileSize.x / 2) + ((posx - posy) * this.tileSize.x / 2),
                            ((game.draw.height / 2)) + ((posy * this.tileSize.y / 2) + (posx * this.tileSize.y / 2))
                        ),
                        this.tileSize,
                        new Vec2(0, 0),
                        new Vec2(640, 320)
                    );
                }
            }
        }
    }
}