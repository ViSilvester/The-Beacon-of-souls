import { Draw } from "./draw.js";
import { Entity } from "./entity.js";

export abstract class Engine {

    draw: Draw;
    entities: Array<Entity>;

    constructor(canvasId: string) {
        this.draw = new Draw(canvasId);
        this.entities = [];
        this.create();
    }

    async create() {

    }

    update() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this);
        }
    }

    render() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].render(this);
        }
    }

    run() {

        this.update();
        this.render();
        requestAnimationFrame(() => {
            this.run();
        })
    }

}
