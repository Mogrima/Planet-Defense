import { Enemy } from "./Enemy.js";

export class Asteroid extends Enemy {
    constructor(game) {
        super(game);
        this.image = document.getElementById('asteroid');
        this.frameY = Math.floor(Math.random() * 4);
    }

    start() {
        super.start();
        this.frameY = Math.floor(Math.random() * 4);
    }
}