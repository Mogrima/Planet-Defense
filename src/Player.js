export class Player {
    constructor(game) {
        this.game = game;
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.radius = 40;
        this.image = document.getElementById('player');
        this.aim;
    }

    draw(context) {
        context.drawImage(this.image, this.x - this.radius, this.y - this.radius);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
    }

    update() {
        this.aim = this.game.calcAim(this.game.mouse, this.game.planet);
        this.x = this.game.planet.x + (this.game.planet.radius +
            this.radius) * this.aim[0];
        this.y = this.game.planet.y + (this.game.planet.radius +
            this.radius) * this.aim[1];
    }
}