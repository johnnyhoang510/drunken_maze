const Item = require("./item");
const Car = require("./car");
const Player = require("./player");
const Maze = require("./maze");



class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameRunning = false; // set to false. we want to start at main menu
        this.gameOver = false;
        this.player = new Player(this.ctx);
        this.car = new Car(this.ctx, 1164, 392);
        this.maze = new Maze(this.ctx);
        
        this.item1 = new Item(this.ctx, 440, 555);
        this.item2 = new Item(this.ctx, 100, 210);
        this.items = [];
        this.items.push(this.item1);
        this.items.push(this.item2);

        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));

        console.log(this.items);
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

    
    gameStart() {
        this.gameRunning = true;
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

    checkCollision(obj1, obj2) { // obj1 will be player
        if (
            (obj1.position.x + obj1.width - 30) >= obj2.position.x &&
            obj1.position.x <= (obj2.position.x + obj2.width) &&
            (obj1.position.y + obj1.height) >= obj2.position.y &&
            obj1.position.y <= (obj2.position.y + obj2.height - 15)
        ) {
            console.log("colliding");
            // obj1.velocity.x = 0;   // this will stop player from moving. need to adjust to freeze keys
            // obj1.velocity.y = 0;
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
        } //helper func to check collision.
        
        // this.gameStart();
        // if (this.gameRunning) this.player.health -= 0.1;
        // console.log(this.player.health);


        //check for collision with items
        if (this.checkCollision(this.player, this.item2)) {
            // this.ctx.clearRect(1200, 700, 100, 210);
            this.item2.position.x = 2500;
            // console.log(this.items);
        };
    }




}


module.exports = Game;