import { Planet } from './Planet.js';
import { Player } from './Player.js';
import { Projectile } from './Projectile.js';
import { Asteroid } from './Asteroid.js';
import { Lobstermorph } from './Lobstermorph.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.planet = new Planet(this);
        this.player = new Player(this);

        this.projectilePool = [];
        this.numberOfProjectiles = 30;
        this.createprojectilePool();

        this.enemyPool = [];
        this.numberOfEnemies = 30;
        this.createEnemyPool();
        this.enemyPool[0].start();
        this.enemyTimer = 0;
        this.enemyInterval = 800;

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;

        this.score = 0;
        this.winningScore = 50;
        this.gameOver = false;
        this.lives = 30;

        this.mouse = {
            x: 0,
            y: 0
        }

        this.debug = true;

        window.addEventListener('mousemove', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });

        window.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.player.shoot();
        });

        window.addEventListener('keyup', e => {
            if (e.key === 'd') this.debug = !this.debug;
        });
    }

    render(context, deltaTime) {
        this.planet.draw(context);
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.projectilePool.forEach(projectile => {
            projectile.draw(context);
            projectile.update();
        })
        this.enemyPool.forEach(enemy => {
            enemy.draw(context);
            enemy.update();
        })

        if (!this.gameOver) {
            if (this.enemyTimer < this.enemyInterval) {
                this.enemyTimer += deltaTime;
            } else {
                this.enemyTimer = 0;
                const enemy = this.getEnemy();
                if (enemy) enemy.start();
                
            }
        }

        if (this.spriteTimer < this.spriteInterval) {
            this.spriteTimer += deltaTime;
            this.spriteUpdate = false;
        } else {
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        }

        if (this.score >= this.winningScore || this.lives < 1) {
            this.gameOver = true;
        }
    }

    drawStatusText(context) {
        context.save();
        context.textAlign = 'left';
        context.font = '30px Impact';
        context.fillText('Score: ' + this.score, 20, 30);
        for (let i = 0; i < this.lives; i++) {
            context.fillRect(20 + 15 * i, 60, 10, 30);
        }
        if (this.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.score >= this.winningScore) {
                message1 = 'You win!';
                message2 = 'Your score is ' + this.score + '!';
            } else {
                message1 = 'You lose!';
                message2 = 'Try again!';
            }
            context.font = '100px Impact';
            context.fillText(message1, this.width * 0.5, 200);
            context.font = '50px Impact';
            context.fillText(message2, this.width * 0.5, 550);
        }
        context.restore();
    }

    calcAim(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1;
        const aimY = dy / distance * -1;
        return [ aimX, aimY, dx, dy ];
    }

    checkCollision(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const sumofRadii = a.radius + b.radius;
        return distance < sumofRadii;
    }

    createprojectilePool() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilePool.push( new Projectile(this) );
        }
    }

    getProjectile() {
        for (let i = 0; i < this.projectilePool.length; i++) {
            if (this.projectilePool[i].free) return this.projectilePool[i];
        }
    }

    createEnemyPool() {
        for (let i = 0; i < this.numberOfEnemies; i++) {
            let randomize = Math.random();
            if (randomize > 0.25) {
                this.enemyPool.push( new Asteroid(this) );
            } else {
                this.enemyPool.push( new Lobstermorph(this) );
            }
        }
    }

    getEnemy() {
        for (let i = 0; i < this.enemyPool.length; i++) {
            if (this.enemyPool[i].free) return this.enemyPool[i];
        }
    }
}