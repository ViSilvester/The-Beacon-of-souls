var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Entity } from "../../engine/entity.js";
import { EzIO } from "../../engine/EzIO.js";
import { Vec2 } from "../../engine/geometry.js";
export class GameMap extends Entity {
    constructor(pos, width, height, tileSize) {
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
        ];
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            this.tileset = yield EzIO.loadImageFromUrl("../../../assets/tileset.png");
        });
    }
    update(game) {
        this.pos = game.camera;
    }
    render(game) {
        if (this.tileset instanceof ImageBitmap) {
            for (var i = 0; i < this.map.length; i++) {
                for (var j = 0; j < this.map.length; j++) {
                    var posx = i - this.pos.x;
                    var posy = j - this.pos.y;
                    game.draw.drawImage(this.tileset, new Vec2(((game.draw.width / 2) - this.tileSize.x / 2) + ((posx - posy) * this.tileSize.x / 2), ((game.draw.height / 2)) + ((posy * this.tileSize.y / 2) + (posx * this.tileSize.y / 2))), this.tileSize, new Vec2(0, 0), new Vec2(640, 320));
                }
            }
        }
    }
}
