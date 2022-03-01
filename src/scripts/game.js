const Item = require("./item");
const Car = require("./car");
const Player = require("./player");
const Maze = require("./maze");
const HealthBar = require("./healthbar");


class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameRunning = false; // set to false. we want to start at main menu
        this.gameOver = false;
        this.player = new Player(this.ctx);
        this.car = new Car(this.ctx, 1164, 392);
        this.copCar = new Image();
        this.copCar.src = "./src/images/copcar2.png";
        this.maze = new Maze(this.ctx);

        // constructor(ctx, x, y, width, height, health, maxHealth, color) {
        this.healthBar = new HealthBar(this.ctx, 1220, 50, 130, 30, 100, 100, "green");
        
        this.item1 = new Item(this.ctx, 440, 555);
        this.item2 = new Item(this.ctx, 100, 210);
        this.item3 = new Item(this.ctx, 1100, 290);
        this.item4 = new Item(this.ctx, 600, 590);
        this.item5 = new Item(this.ctx, 1030, 430);
        this.items = [];
        this.items.push(this.item1);
        this.items.push(this.item2);
        this.items.push(this.item3);
        this.items.push(this.item4);
        this.items.push(this.item5);

        this.victory = new Image();
        this.victory.src = "src/images/gamewin.png";
        this.lost = new Image();
        this.lost.src = "src/images/gamelost.png";

        this.playAgain = new Image();
        this.playAgain.src = "src/images/gamewinplayagain.png"

        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
        window.addEventListener("click", this.playAgainScreen.bind(this));
    }


    keyDown(e){
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                // console.log('left')
                this.player.keys.left.pressed = true;
                this.player.velocity.x = 1.4;
                this.player.lastKey = "left";
                break;
    
            case 40:
                // console.log('down')
                this.player.keys.down.pressed = true;
                this.player.velocity.y = -1.4;
                this.player.lastKey = "down";
                break;
    
            case 39:
                // console.log('right')
                this.player.keys.right.pressed = true;
                this.player.velocity.x = -1.4;
                this.player.lastKey = "right";
                break;
    
            case 38:
                // console.log('up')
                this.player.keys.up.pressed = true;
                this.player.velocity.y = 1.4;
                this.player.lastKey = "up";
                break;
        }
    } 
    
    keyUp(e) {
        e.preventDefault();
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

    playAgainScreen(e){    // not working properly
        // e.preventDefault();
        if (this.gameOver) {
            this.animate();
            this.gameOver = false
            this.gameRunning = true;
        }
    }

    
    gameStart() {
        this.gameRunning = true;
        //this should include health drain. it is currently in game.draw
    }


    showWin() {
        // if the player collides with the car
        this.gameOver = true;
        this.gameRunning = false;
        this.drawVictory();
        this.drawPlayAgain();
    }


    showLost() {
        // if health reaches 0
        this.gameOver = true;
        this.gameRunning = false;
        this.drawLost();
        this.drawPlayAgain();
    }

    draw() {
        this.item1.draw();
        this.item2.draw();
        this.item3.draw();
        this.item4.draw();
        this.item5.draw();
        this.player.draw();
        this.car.draw();
        this.maze.draw();
        this.healthBar.draw();
        // this.healthBar.updateHealth(-1); // this works, but need to adjust and move somewhere else? not decrementing correctly

        //drawing cop cars
        this.ctx.drawImage(this.copCar, 1200, 500, 45, 70);
        this.ctx.drawImage(this.copCar, 1200, 300, 45, 70);
    }

    checkCollision(obj1, obj2) { // obj1 will be player
        if (
            (obj1.position.x + obj1.width - 30) >= obj2.position.x &&
            obj1.position.x <= (obj2.position.x + obj2.width) &&
            (obj1.position.y + obj1.height) >= obj2.position.y &&
            obj1.position.y <= (obj2.position.y + obj2.height - 15)
        ) {
            console.log("colliding");
            return true;
        }
    }

    animate() {
        let animateId;
        animateId = requestAnimationFrame(this.animate.bind(this)) // argument is func we want to loop
        this.ctx.clearRect(0, 0, 1400, 700);

        
        //drawing background
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 1200, 700)
        this.ctx.strokeStyle = "black"
        this.ctx.stroke();
        this.ctx.fillStyle = "rgb(45, 45, 45)";
        this.ctx.fill();
        
        //draws every object
        this.draw();

        //updating player movement
        this.player.update();
        
        // this.maze.draw();
        // this.car.draw();
        


        //checking for collision with car. game should end if this is true
        if (this.checkCollision(this.player, this.car)) {
            this.gameOver = true;
            console.log("You Win!");
            cancelAnimationFrame(animateId);
            this.showWin();
        }
        
        if (this.healthBar.health === 0) {
            this.gameOver = true;
            console.log("You Lose");
            cancelAnimationFrame(animateId);
            this.showLost();
        }

        //check for collision with items
        this.items.forEach(item => {
            if (this.checkCollision(this.player, item)) {
                this.healthBar.updateHealth(20);
                item.position.x = 2500; // moves item off canvas
            };
        })
    }



    // ctx.drawImage(image, sourcex, sy, sWidth, sHeight, destinationx, dy, dWidth, dHeight);
    drawVictory() {
        this.ctx.drawImage(this.victory, 400, 100, 400, 100);
    }

    drawPlayAgain() {
        this.ctx.drawImage(this.playAgain, 400, 250, 400, 100);
    }

    drawLost() {
        this.ctx.drawImage(this.lost, 400, 100, 400, 100);
    }
}


module.exports = Game;