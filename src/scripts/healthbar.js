

class HealthBar {
    constructor(ctx, x, y, width, height, health, maxHealth, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.health = health;
        this.maxWidth = width;
        this.color = color;
        this.healthTag = new Image();
        this.healthTag.src = "./src/images/health.png"; 
    }


    draw() {
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "#333";
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.maxWidth, this.height);

        this.ctx.drawImage(this.healthTag, 1220, 55, 60, 50)
    }

    //not working properly
    drainHealth() {      
        while (this.health !== 0) {
            this.health -=1;
        }
    }

    updateHealth(val) {
        if (this.health > 0) {
                this.health += val;
                this.width = (this.health / this.maxHealth) * this.maxWidth;
        }
    }
}

module.exports = HealthBar;