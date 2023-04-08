
import { KeybordController } from "../../controllers/keyboardController.js";
import { Engine } from "../engine/engine.js";
import { Vec2, Vec3 } from "../engine/geometry.js";
import { Enemy } from "../entites/enemy/enemy.js";
import { GameMap } from "../entites/gameMap/gameMap.js";
import { Player } from "../entites/player/player.js";

export class Game extends Engine {


    camera = new Vec2(0, 0);
    tileSize = new Vec2(40 * 3, 20 * 3);
    map = new GameMap(new Vec3(0, 0, 0), this.draw.width, this.draw.height, this.tileSize);
    enemy = new Enemy(new Vec2(5.5, 5.5));
    player = new Player();


    async create() {

        KeybordController.startKeybordListner();

    }

    update(): void {
        this.map.update(this);
        this.enemy.update(this);
        this.player.update(this);

        this.camera = this.player.pos;
    }

    render(): void {
        this.draw.fillBackgroudColor(0, 0, 0);
        this.map.render(this);
        this.enemy.render(this);
        this.player.render(this);
    }
}