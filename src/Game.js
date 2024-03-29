import { Planet } from './Planet.js';
import { Player } from './Player.js';
import { Projectile } from './Projectile.js';
import { Asteroid } from './Asteroid.js';
import { Lobstermorph } from './Lobstermorph.js';
import { Beetlemorph } from './Beetlemorph.js';
import { Rhinomorph } from './Rhinomorph.js';
import { SoundController } from './SoundController.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.planet = new Planet(this);
        this.player = new Player(this);
        this.sound = new SoundController();

        this.projectilePool = [];
        this.numberOfProjectiles = 30;
        this.createprojectilePool();

        this.enemyPool = [];
        this.numberOfEnemies = 30;
        this.createEnemyPool();
        this.enemyPool[0].start();
        this.enemyTimer = 0;
        this.enemyInterval = 1200;

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;

        this.score = 0;
        this.winningScore = 100;
        this.gameOver = false;
        this.lives = 10;

        this.laser = false;
        this.energy = 0;

        this.gameTime = 0;

        this.mouse = {
            x: 0,
            y: 0,
        };

        this.debug = false;

        this.restartKeys = ['r', 'R', 'к', 'К'];

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
            if (e.key === '1') this.player.shoot();
            if (this.restartKeys.includes(e.key) &&
            this.gameOver) this.restart();
        });
    }

    render(context, deltaTime) {
        if (!this.gameOver) this.gameTime += deltaTime;
        this.planet.draw(context);
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.projectilePool.forEach(projectile => {
            projectile.draw(context);
            projectile.update();
        });
        this.enemyPool.forEach(enemy => {
            enemy.draw(context);
            enemy.update();
        });

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

        if (this.lives < 1) {
            this.gameOver = true;
        }

        this.energy = this.score;
        if (this.energy >= this.winningScore) {
            this.sound.сooldownLaser();
            this.laser = true;
            this.gameOver = true;
        }
    }

    drawStatusText(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.shadowBlur = 10;
        context.textAlign = 'left';
        context.fillStyle = '#08e8de';
        context.font = '30px Impact';
        const formattedTime = (this.gameTime * 0.001).toFixed(1);
        context.fillText('Score: ' + this.score, 20, 30);
        for (let i = 0; i < this.lives; i++) {
            context.fillRect(20 + 15 * i, 60, 10, 30);
        }
        context.save();
        this.laser ? context.fillStyle = 'gold' :
            context.fillStyle = '#08e8de';
        for (let i = 0; i < this.energy; i++) {
            context.fillRect(20 + 2 * i, 110, 2, 25);
        }
        context.restore();
        if (this.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.score >= this.winningScore) {
                message1 = 'You win!';
                message2 = 'Your score is ' + this.score + ' and time ' + formattedTime + '!';
            } else {
                message1 = 'You lose!';
                message2 = 'Try again! You lasted ' + formattedTime + '!';
            }
            context.font = '100px Impact';
            context.fillText(message1, this.width * 0.5, 200);
            context.font = '50px Impact';
            context.fillText(message2, this.width * 0.5, 550);
            context.font = '20px Impact';
            context.fillText('Press R to restart!', this.width * 0.5, 650);
        }
        context.restore();
    }

    calcAim(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1;
        const aimY = dy / distance * -1;
        return [aimX, aimY, dx, dy];
    }

    checkCollision(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const sumofRadii = a.radius + b.radius;
        return distance < sumofRadii;
    }

    restart() {
        this.sound.mainSound();
        this.sound.reset();
        this.gameTime = 0;
        this.projectilePool = [];
        this.createprojectilePool();
        this.enemyPool = [];
        this.createEnemyPool();
        this.enemyPool[0].start();
        this.score = 0;
        this.gameOver = false;
        this.lives = 10;
        this.laser = false;
        this.energy = 0;
        this.mouse = {
            x: 0,
            y: 0,
        };
    }

    createprojectilePool() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilePool.push(new Projectile(this));
        }
    }

    getProjectile() {
        for (let i = 0; i < this.projectilePool.length; i++) {
            if (this.projectilePool[i].free) return this.projectilePool[i];
        }
    }

    createEnemyPool() {
        for (let i = 0; i < this.numberOfEnemies; i++) {
            const randomize = Math.random();
            if (randomize < 0.25) {
                this.enemyPool.push(new Asteroid(this));
            } else if (randomize < 0.5) {
                this.enemyPool.push(new Beetlemorph(this));
            } else if (randomize < 0.75) {
                this.enemyPool.push(new Rhinomorph(this));
            } else {
                this.enemyPool.push(new Lobstermorph(this));
            }
        }
    }

    getEnemy() {
        for (let i = 0; i < this.enemyPool.length; i++) {
            if (this.enemyPool[i].free) return this.enemyPool[i];
        }
    }
}