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
import { Engine } from "../engine/engine.js";
import { Vec2, Vec3 } from "../engine/geometry.js";
import { Enemy } from "../entites/enemy/enemy.js";
import { GameMap } from "../entites/gameMap/gameMap.js";
import { Player } from "../entites/player/player.js";
export class Game extends Engine {
    constructor() {
        super(...arguments);
        this.camera = new Vec2(0, 0);
        this.tileSize = new Vec2(40 * 3, 20 * 3);
        this.map = new GameMap(new Vec3(0, 0, 0), this.draw.width, this.draw.height, this.tileSize);
        this.enemy = new Enemy(new Vec2(5.5, 5.5));
        this.player = new Player();
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            KeybordController.startKeybordListner();
        });
    }
    update() {
        this.map.update(this);
        this.enemy.update(this);
        this.player.update(this);
        this.camera = this.player.pos;
    }
    render() {
        this.draw.fillBackgroudColor(0, 0, 0);
        this.map.render(this);
        this.enemy.render(this);
        this.player.render(this);
    }
}
