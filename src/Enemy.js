export class Enemy {
    constructor(game) {
        this.game = game;
        this.x = 100;
        this.y = 100;
        this.radius = 40;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.speedX = 0;
        this.speedY = 0;
        this.free = true;
    }

    start() {
        this.free = false;
       
        if (Math.random() < 0.5) {
            this.x = Math.random() * this.game.width
            this.y = Math.random() < 0.5 ? -this.radius : this.game.height + this.radius
        } else {
            this.x = Math.random() < 0.5 ? -this.radius : this.game.width + this.radius
            this.y = Math.random() * this.game.height
        }
        const aim = this.game.calcAim(this, this.game.planet);
        this.speedX = aim[0];
        this.speedY = aim[1];
    }

    reset() {
        this.free = true;
    }

    draw(context) {
        if (!this.free) {
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.stroke();
            context.restore();
        }
    }

    update() {
        if (!this.free) {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.game.checkCollision(this, this.game.planet)) {
                this.reset();
            }

            if (this.game.checkCollision(this, this.game.player)) {
                this.reset();
            }

            if (this.game.checkCollision(this, this.game.player)) {
                this.reset();
            }
        }
    }
}