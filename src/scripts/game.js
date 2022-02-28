const Item = require("./item");
const Car = require("./car");
const Player = require("./player");
const Maze = require("./maze");

// const keys = {
//     right: {
//         pressed: false
//     },
//     left: {
//         pressed: false
//     },
//     up: {
//         pressed: false
//     },
//     down: {
//         pressed: false
//     }
// };

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameRunning = false;
        this.gameOver = false;
        this.item1 = new Item(this.ctx, 440, 555);
        this.item2 = new Item(this.ctx, 100, 210);
        this.player = new Player(this.ctx);
        this.car = new Car(this.ctx, 1164, 392);
        this.maze = new Maze(this.ctx);
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
    }

    keyDown(e){
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                // console.log('left')
                this.player.keys.left.pressed = true;
                this.player.velocity.x = 1.4;
                break;
    
            case 40:
                // console.log('down')
                this.player.keys.down.pressed = true;
                this.player.velocity.y = -1.4;
                // this.player.lastKey = "up";
                break
    
            case 39:
                // console.log('right')
                this.player.keys.right.pressed = true;
                this.player.velocity.x = -1.4;
                break
    
            case 38:
                // console.log('up')
                this.player.keys.up.pressed = true;
                this.player.velocity.y = 1.4;
                this.player.lastKey = "up";
                break
        }
    } 
    
    keyUp(e) {
        switch (e.keyCode) {
            case 37:
                // console.log('left');
                this.player.keys.left.pressed = false;
                this.player.velocity.x = 0;
                break;

            case 40:
                // console.log('down');
                this.player.keys.down.pressed = false;
                this.player.velocity.y = 0;
                break;

            case 39:
                // console.log('right');
                this.player.keys.right.pressed = false
                this.player.velocity.x = 0
                break;

            case 38:
                // console.log('up');
                this.player.keys.up.pressed = false;
                this.player.velocity.y = 0;
                break;
        }
    }



    gameWon() {
        // if the player collides with the car
        this.gameOver = true;
        this.gameRunning = false;
    }


    gameLost() {
        // if health reaches 0
        if (this.player.health === 0) {
            this.gameOver = true;
            this.gameRunning = false;
        }
    }

    draw() {
        this.item1.draw();
        this.item2.draw();
        this.player.draw();
        this.car.draw();
        this.maze.draw();
    }

    // checkCollision(obj1, obj2) {
    //     if (
    //         (obj1.position.x + obj1.width) >= obj2.position.x &&
    //         obj1.position.x <= (obj2.position.x + obj2.width) &&
    //         (obj1.position.y + obj1.height) >= obj2.position.y &&
    //         obj1.position.y <= (obj2.position.y + obj2.height)
    //     ) {
    //         console.log("colliding")
    //         // obj1.velocity.x = 0;   // this will stop player from moving. need to adjust to freeze keys
    //         // obj1.velocity.y = 0;
    //         return true
    //     }
    // }

    animate() {
        let animateId;
        requestAnimationFrame(this.animate.bind(this)) // argument is func we want to loop
        this.ctx.clearRect(0, 0, 1400, 700);

        // checkCollision(player, car); //helper func to check collision. returns true and sets velo to 0

        //drawing background
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 1200, 700)
        this.ctx.strokeStyle = "black"
        this.ctx.stroke();
        this.ctx.fillStyle = "rgb(45, 45, 45)";
        this.ctx.fill();


        this.draw();
        //updating player movement
        this.player.update();

        this.maze.draw(); // why do these 2 need to be in here??
        this.car.draw();

    // // reset velocity x if keys are lifted
    // if (keys.right.pressed) {
    //     player.velocity.x = -1.4;
    // } else if (keys.left.pressed) {
    //     player.velocity.x = 1.4;
    // } else {
    //     player.velocity.x = 0;
    // }

    // // reset velocity y if keys are lifted
    // if (keys.up.pressed) {
    //     player.velocity.y = 1.4;
    // } else if (keys.down.pressed) {
    //     player.velocity.y = -1.4;
    // } else {
    //     player.velocity.y = 0;
    // }
}



}


module.exports = Game;