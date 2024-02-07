import { Enemy } from "./Enemy.js";

export class Asteroid extends Enemy {
    constructor(game) {
        super(game);
        this.image = document.getElementById('asteroid');
    }
}