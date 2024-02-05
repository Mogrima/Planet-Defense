export class Projectile {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.radius = 20;
        this.speedX = 1;
        this.speedY = 1;
        this.free = true;
    }

    start() {
        this.free = false;
    }

    reset() {
        this.free = true;
    }

    draw(context) {
        if (!this.free) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        }
    }

    update() {
        if (!this.free) {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
}