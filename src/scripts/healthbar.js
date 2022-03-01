

class HealthBar {
    constructor(ctx, x, y, width, height, maxHealth, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.health = maxHealth
        this.maxWidth = width;
        this.color = color;
    }


    draw() {
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "#333";
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.maxWidth, this.height);
    }

    updateHealth(val) {
        if (this.health >= 0) {
                this.health += val;
                this.width = (this.health / this.maxHealth) * this.maxWidth;
        }
    }
}

module.exports = HealthBar;