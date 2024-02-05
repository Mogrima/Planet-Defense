import { Planet } from './Planet.js';
import { Player } from './Player.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.planet = new Planet(this);
        this.player = new Player(this);

        this.mouse = {
            x: 0,
            y: 0
        }

        window.addEventListener('mousemove', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });
    }

    render(context) {
        this.planet.draw(context);
        this.player.draw(context);
        this.player.update();
        context.beginPath();
        context.moveTo(this.planet.x, this.planet.y);
        context.lineTo(this.mouse.x, this.mouse.y);
        context.stroke();
    }

    calcAim(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance;
        const aimY = dy / distance;
        return [ aimX, aimY, dx, dy ];
    }
}