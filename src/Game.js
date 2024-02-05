import { Planet } from './Planet.js';
import { Player } from './Player.js';
import { Projectile } from './Projectile.js';
import { Enemy } from './Enemy.js';

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

    render(context) {
        this.planet.draw(context);
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
    }

    calcAim(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1;
        const aimY = dy / distance * -1;
        return [ aimX, aimY, dx, dy ];
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
            this.enemyPool.push( new Enemy(this) );
        }
    }

    getEnemy() {
        for (let i = 0; i < this.enemyPool.length; i++) {
            if (this.enemyPool[i].free) return this.enemyPool[i];
        }
    }
}