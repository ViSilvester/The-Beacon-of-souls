import { KeybordController } from "../../../controllers/keyboardController.js";
import { EzIO } from "../../engine/EzIO.js";
import { Engine } from "../../engine/engine.js";
import { Entity } from "../../engine/entity.js";
import { Vec2 } from "../../engine/geometry.js";
import { Game } from "../../game/game.js";

export class Player extends Entity {

    pos: Vec2;
    spriteSheet: ImageBitmap | undefined;
    dir: number;
    animationFrame: number;
    animationMax: number;
    currentAnimation: number;
    previusAnimation: number;

    constructor() {
        super();
        this.pos = new Vec2(0, 0);
        this.dir = 0;
        this.animationMax = 0;
        this.animationFrame = 0;
        this.currentAnimation = 0;
        this.previusAnimation = 0;

    }

    async create(): Promise<void> {

        this.spriteSheet = await EzIO.loadImageFromUrl('./assets/spritesheet.png');
    }

    update(engine: Engine): void {

        this.keyboardHandler();
        this.animationHandler();

        //movement

        if (this.currentAnimation == 1 || this.previusAnimation == 1) {

            switch (this.dir) {
                case 0:
                    this.pos.y += 0.1;
                    break;
                case 2:
                    this.pos.x += 0.1;
                    break;
                case 4:
                    this.pos.y -= 0.1;
                    break;
                case 6:
                    this.pos.x -= 0.1;
                    break;
            }
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

        const rpos = new Vec2(mapPos.x - (game.tileSize.x / 2), mapPos.y - game.tileSize.y * 2 * 0.75)

        if (this.spriteSheet instanceof ImageBitmap) {
            game.draw.drawImage(
                this.spriteSheet,
                rpos,
                new Vec2(game.tileSize.x, game.tileSize.y * 2),
                new Vec2(Math.floor(this.animationFrame) * 500, this.dir * 500),
                new Vec2(500, 500)
            );
        }
    }

    private keyboardHandler() {

        if (KeybordController.getKeyState('d')) {
            this.dir = 2;
            this.currentAnimation = 1;
        }

        else if (KeybordController.getKeyState('a')) {
            this.dir = 6;
            this.currentAnimation = 1;
        }

        else if (KeybordController.getKeyState('s')) {
            this.dir = 0;
            this.currentAnimation = 1;
        }

        else if (KeybordController.getKeyState('w')) {
            this.dir = 4;
            this.currentAnimation = 1;

        }
        else {
            this.currentAnimation = 0;
        }
    }

    private animationHandler() {

        this.animationFrame += 0.2;

        if (this.currentAnimation == 1) {
            this.animationMax = 8;
        }
        else if (this.previusAnimation == 1 && this.currentAnimation == 0) {

            if (this.animationFrame < 2.5) {
                this.animationMax = 2;
            }
            else if (this.animationFrame < 4.5) {
                this.animationMax = 4;
            }
            else if (this.animationFrame < 6.5) {
                this.animationMax = 6;
            }
            else {
                this.animationMax = 8;
            }
        }

        if (this.currentAnimation == 0 && this.previusAnimation == 0) {
            this.animationMax = 0;
        }


        if (this.animationFrame >= this.animationMax) {
            this.animationFrame = 0;
            this.previusAnimation = this.currentAnimation;
        }
    }
} 