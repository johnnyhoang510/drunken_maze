

class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.position = {
            x: 1100,
            y: 400
        }
        this.width = 60;
        this.height = 60;
        this.velocity = {
            x: 0,
            y: 0
        }

        this.keys = {  //default to false bc keys aren't pressed
            right: {
                pressed: false
            },
            left: {
                pressed: false
            },
            up: {
                pressed: false
            },
            down: {
                pressed: false
            }
        };


        this.health = 300;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteHeight = 48.5;
        this.spriteWidth = 32.5;
        this.animationCount = 0; // used to reset spritesheet
        this.lastKey = "up"; // default set bc char is looking down. use this to track last key to press changes direction of sprite
    }

    draw() {
        let char = new Image();
        char.src = "./src/images/char2.png";
        this.ctx.drawImage(char, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.spriteWidth, this.spriteHeight);
        // ctx.drawImage(image, sourcex, sy, sWidth, sHeight, destinationx, dy, dWidth, dHeight);
    }


    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.animateFrame();
    }

    animateFrame() {
        switch (this.lastKey) {
            case ("up"):
                if (this.keys.up.pressed) {
                    this.frameY = 0; //first row of spritesheet
                    if (this.animationCount < 3) {
                        this.animationCount += 1;
                    } else if (this.frameX < 3) {
                        this.frameX += 1; //changing the frame
                        this.animationCount = 0; //resets to first sprite in row
                    } else {
                        this.frameX = 0; // if we go past end of sheet, reset back down
                        this.animationCount = 0;
                    }
                }

            case ("down"):
                if (this.keys.down.pressed) {
                    this.frameY = 3;
                    if (this.animationCount < 3) {
                        this.animationCount += 1;
                    } else if (this.frameX < 3) {
                        this.frameX += 1;
                        this.animationCount = 0;
                    } else {
                        this.frameX = 0;
                        this.animationCount = 0;
                    }
                }
            
            case ("left"):
                if (this.keys.left.pressed) {
                    this.frameY = 2;
                    if (this.animationCount < 3) {
                        this.animationCount += 1;
                    } else if (this.frameX < 3) {
                        this.frameX += 1;
                        this.animationCount = 0;
                    } else {
                        this.frameX = 0;
                        this.animationCount = 0;
                    }
                }
            
            case ("right"):
                if (this.keys.right.pressed) {
                    this.frameY = 1;
                    if (this.animationCount < 3) {
                        this.animationCount += 1;
                    } else if (this.frameX < 3) {
                        this.frameX += 1;
                        this.animationCount = 0;
                    } else {
                        this.frameX = 0;
                        this.animationCount = 0;
                    }
                }
        }
    }
}


module.exports = Player;