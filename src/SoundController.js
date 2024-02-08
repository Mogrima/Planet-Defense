import Volume from './Settings.js';

export class SoundController {
    constructor() {
        this.mainTheme = document.getElementById('mainTheme');
        this.explosionEnemy = document.getElementById('explosionEnemy');
        this.hit = document.getElementById('hit');
        this.shot = document.getElementById('shot');
        this.cooldown = document.getElementById('cooldown');
        this.cooldownRun = true;
        this.volume = new Volume();
    }

    mainSound() {
        this.mainTheme.currentTime = 0;
        this.mainTheme.loop = true;
        this.mainTheme.volume = this.volume.mainThemeValue / 100;
        this.mainTheme.play();
    }

    explosion() {
        this.explosionEnemy.currentTime = 0;
        this.explosionEnemy.volume = this.volume.explosionEnemyValue / 100;
        this.explosionEnemy.play();
    }

    hitExplosion() {
        this.hit.currentTime = 0;
        this.hit.volume = this.volume.hitValue / 100;
        this.hit.play();
    }

    shotPlayer() {
        this.shot.currentTime = 0;
        this.shot.volume = this.volume.shotValue / 100;
        this.shot.play();
    }

    сooldownLaser() {
        if (this.cooldownRun) {
            this.cooldownRun = false;
            this.cooldown.currentTime = 0;
            this.cooldown.volume = 0.1;
            this.cooldown.play();
        }
    }

    reset() {
        this.cooldownRun = true;
    }
}