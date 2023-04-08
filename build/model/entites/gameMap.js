var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KeybordController } from "../../controllers/keyboardController.js";
import { Entity } from "../engine/entity.js";
import { EzIO } from "../engine/EzIO.js";
import { Vec2 } from "../engine/geometry.js";
export class GameMap extends Entity {
    constructor(pos) {
        super();
        this.pos = pos;
        this.tileSize = new Vec2(40 * 3, 20 * 3);
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
    update() {
        if (KeybordController.getKeyState('d')) {
            this.pos.x += 0.1;
        }
        if (KeybordController.getKeyState('a')) {
            this.pos.x -= 0.1;
        }
        if (KeybordController.getKeyState('s')) {
            this.pos.y += 0.1;
        }
        if (KeybordController.getKeyState('w')) {
            this.pos.y -= 0.1;
        }
        if (KeybordController.getKeyState('q')) {
            this.pos.z += 0.1;
        }
        if (KeybordController.getKeyState('e')) {
            this.pos.z -= 0.1;
        }
    }
    render(draw) {
        if (this.tileset instanceof ImageBitmap) {
            for (var i = 0; i < this.map.length; i++) {
                for (var j = 0; j < this.map.length; j++) {
                    var posx = i - this.pos.x;
                    var posy = j - this.pos.y;
                    draw.drawImage(this.tileset, new Vec2((draw.width / 2) + ((posx - posy) * this.tileSize.x / 2), (draw.height / 2) + ((posy * this.tileSize.y / 2) + (posx * this.tileSize.y / 2))), this.tileSize, new Vec2(0, 0), new Vec2(640, 320));
                }
            }
        }
    }
}
