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
        this.frameX = 0;
        this.lives = this.maxLives;
    }

    reset() {
        this.free = true;
    }

    hit(damage) {
        this.lives -= damage;
    }

    draw(context) {
        if (!this.free) {
            context.drawImage(this.image,
                this.frameX * this.width, this.frameY * this.height,
                this.width, this.height, 
                this.x - this.radius, this.y - this.radius, this.width, this.height);
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
                context.fillText(this.lives, this.x, this.y);
            }
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

            this.game.projectilePool.forEach(projectile => {
                if (!projectile.free &&
                    this.game.checkCollision(this, projectile)) {
                        projectile.reset();
                        this.hit(1);
                }
            })
            if (this.lives < 1) {
                this.frameX++;
            }
            if (this.frameX > this.maxFrame) this.reset();
        }
    }
}