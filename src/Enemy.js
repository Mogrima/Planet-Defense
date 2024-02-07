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
        this.angle = 0;
        this.collided = false;
    }

    start() {
        this.free = false;
        this.collided = false;
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
        this.angle = Math.atan2(aim[3], aim[2]) + Math.PI * 0.5;
    }

    reset() {
        this.free = true;
    }

    hit(damage) {
        this.lives -= damage;
        if (this.lives >= 1) this.frameX++;
    }

    draw(context) {
        if (!this.free) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image,
                this.frameX * this.width, this.frameY * this.height,
                this.width, this.height, 
                -this.radius, -this.radius, this.width, this.height);
            if (this.game.debug) {
                context.beginPath();
                context.arc(0, 0, this.radius, 0, Math.PI * 2);
                context.stroke();
                context.fillText(this.lives, 0, 0);
            }
            context.restore();
        }
    }

    update() {
        if (!this.free) {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.game.checkCollision(this, this.game.planet)
                && this.lives >= 1) {
                this.lives = 0;
                this.speedX = 0;
                this.speedY = 0;
                this.collided = true;
                this.game.lives--;
            }

            if (this.game.checkCollision(this, this.game.player)
                && this.lives >= 1) {
                this.lives = 0;
                this.collided = true;
                this.game.lives--;
            }

            this.game.projectilePool.forEach(projectile => {
                if (!projectile.free &&
                    this.game.checkCollision(this, projectile) && this.lives >= 1) {
                        projectile.reset();
                        this.hit(1);
                }
            })
            if (this.lives < 1 && this.game.spriteUpdate) {
                this.frameX++;
            }
            if (this.frameX > this.maxFrame) {
                this.reset();
                if (!this.collided) this.game.score += this.maxLives;
            }
        }
    }
}