import { Planet } from './Planet.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.planet = new Planet(this);
    }

    render(context) {
        this.planet.draw(context);
    }
}