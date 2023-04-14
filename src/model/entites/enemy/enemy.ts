import { Entity } from "../../engine/entity.js";
import { Vec2 } from "../../engine/geometry.js";
import { Game } from "../../game/game.js";

export class Enemy extends Entity {

    pos: Vec2;
    timer: number;
    destiny: Vec2;

    constructor(pos: Vec2) {
        super();
        this.pos = pos;
        this.timer = 0;
        this.destiny = new Vec2(0, 0);
    }

    create(): void {

    }

    update(game: Game): void {
        this.timer += 1;

        //movimento aleatorio
        if (this.timer % 50 == 0) {

            if (Math.random() > 0.5) {

                if (Math.random() < 0.5) {
                    this.destiny = new Vec2(Math.round(2 - (Math.random() * 4)), 0);
                }
                else {
                    this.destiny = new Vec2(0, Math.round(2 - (Math.random() * 4)));
                }
            }
        }

        if (this.timer > 10000000) {
            this.timer = 0.
        }

        // resolve movimento

        if (this.destiny.x > 0) {
            this.pos.x += 0.05;
            this.destiny.x -= 0.05
        }
        if (this.destiny.x < 0) {
            this.pos.x -= 0.05;
            this.destiny.x += 0.05
        }

        if (this.destiny.y > 0) {
            this.pos.y += 0.05;
            this.destiny.y -= 0.05
        }
        if (this.destiny.y < 0) {
            this.pos.y -= 0.05;
            this.destiny.y += 0.05
        }


    }

    render(game: Game): void {

        const fPos = new Vec2(
            this.pos.x - game.camera.x,
            this.pos.y - game.camera.y
        );

        const mapPos = new Vec2(
            (game.draw.width / 2) + ((fPos.x - fPos.y) * game.tileSize.x / 2),
            (game.draw.height / 2) + ((fPos.y + fPos.x) * game.tileSize.y / 2)
        );

        game.draw.circle(mapPos, 10, 255, 0, 0);

    }


}