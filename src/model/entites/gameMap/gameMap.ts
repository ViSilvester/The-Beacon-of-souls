import { Entity } from "../../engine/entity.js";
import { EzIO } from "../../engine/EzIO.js";
import { Vec2 } from "../../engine/geometry.js";
import { Game } from "../../game/game.js";

export class GameMap extends Entity {

    height: number;
    width: number;
    tileset!: ImageBitmap;
    tileSize: Vec2;
    map: Array<Array<number>> = []
    pos: Vec2;

    constructor(pos: Vec2, width: number, height: number, tileSize: Vec2) {
        super();
        this.width = width;
        this.height = height;
        this.pos = pos;
        this.tileSize = tileSize;
    }

    async create() {

        this.tileset = await EzIO.loadImageFromUrl('./assets/tileset2.png');
        const amap: Array<number> = (await EzIO.loadJsonFromUrl('./assets/mapa.json')).layers[0].data;

        for (var i = 0; i < 100; i++) {
            this.map.push(amap.splice(0, 100));
        }
    }

    update(game: Game): void {
        this.pos = game.camera;
    }

    render(game: Game): void {

        if (this.tileset instanceof ImageBitmap && this.map) {

            const range = 20
            const limitLeft = Math.floor(game.camera.x - range < 0 ? 0 : game.camera.x - range);
            const limitRight = Math.floor(game.camera.x + range > this.map.length - 1 ? this.map.length - 1 : game.camera.x + range);

            const limitTop = Math.floor(game.camera.y - range < 0 ? 0 : game.camera.y - range);
            const limitBottom = Math.floor(game.camera.y + range > this.map.length - 1 ? this.map.length - 1 : game.camera.y + range);


            for (var i = limitLeft; i < limitRight; i++) {
                for (var j = limitTop; j < limitBottom; j++) {

                    var posx = i - this.pos.x;
                    var posy = j - this.pos.y;


                    var tile = this.map[j][i] - 1;
                    var tilex = (tile % 5) * 64;
                    var tiley = (tile / 5) * 32;

                    game.draw.drawImage(
                        this.tileset,
                        new Vec2(
                            ((game.draw.width / 2) - this.tileSize.x / 2) + ((posx - posy) * this.tileSize.x / 2),
                            ((game.draw.height / 2)) + ((posy * this.tileSize.y / 2) + (posx * this.tileSize.y / 2))
                        ),
                        this.tileSize,
                        new Vec2(tilex, tiley),
                        new Vec2(64, 32)
                    );


                }
            }
        }
    }
}