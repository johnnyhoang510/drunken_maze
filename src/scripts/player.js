
class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.position = {
            x: 1060,
            y: 400
        }
        this.width = 60;
        this.height = 60;
        this.velocity = {
            x: 0,
            y: 0
        }

        this.health = 100;

        // ----------  sprite sheet. BUGGY
        // this.frameX = 0;
        // this.frameY = 0;
        // this.spriteHeight = 60;
        // this.spriteWidth = 60;
        // this.charSprite = new Image();
        // this.charSprite.src = '/src/images/char_sprites.png';
        // this.charSprite.onload = () => this.update();
    }

    draw() {
        // this.ctx.fillStyle = 'red';
        // this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        let char = new Image();
        char.src = "./src/images/char.png";
        this.ctx.drawImage(char, this.position.x, this.position.y, this.width, this.height);
    }


    // not working
    // drawPlayer() {
    //     this.ctx.beginPath();
    //     this.ctx.drawImage(this.playerSprite, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY,
    //         this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    //     // ctx.drawImage(image, sourcex, sy, sWidth, sHeight, destinationx, dy, dWidth, dHeight)
    // }

    update() {
        this.draw();
        // this.drawPlayer();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


module.exports = Player;