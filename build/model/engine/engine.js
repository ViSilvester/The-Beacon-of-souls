var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Draw } from "./draw.js";
export class Engine {
    constructor(canvasId) {
        this.draw = new Draw(canvasId);
        this.entities = [];
        this.create();
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
        });
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
        });
    }
}
