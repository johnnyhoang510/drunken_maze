const Player = require("./player");
const Maze = require("./maze");
const HealthBar = require("./healthbar");


class Game {
    constructor(ctx, fogctx) {
        this.ctx = ctx;
        this.fogctx = fogctx;
        this.lightRadius = 100;
        this.gameRunning = false; // want to start at main menu
        this.gameOver = false;
        this.player = new Player(this.ctx);
        // this.car = new Car(this.ctx, 1164, 392);
        this.maze = new Maze(this.ctx);

        // constructor(ctx, x, y, width, height, health, maxHealth, color) {
        this.healthBar = new HealthBar(this.ctx, 1220, 100, 130, 30, 2000, 2000, "green");
        
        this.music = new Audio();
        this.music.src = "src/images/audio.mp3";
        this.music.loop = true;
        this.music.volume = 0.1;

        this.burp = new Audio();
        this.burp.src = "src/images/burp.mp3";
        this.burp.volume = 0.4;

        this.victory = new Image();
        this.victory.src = "src/images/youwin.png";
        this.lost = new Image();
        this.lost.src = "src/images/youlose.png";
        this.playAgain = new Image();
        this.playAgain.src = "src/images/playagain.png";
        this.playAgainBG = new Image();
        this.playAgainBG.src = "src/images/bg.png";

        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
        window.addEventListener("click", this.playAgainScreen.bind(this));
    }


    keyDown(e){
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                this.player.keys.left.pressed = true;
                this.player.velocity.x = 1.4;
                this.player.lastKey = "left";
                break;
    
            case 40:
                this.player.keys.down.pressed = true;
                this.player.velocity.y = -1.4;
                this.player.lastKey = "down";
                break;
    
            case 39:
                this.player.keys.right.pressed = true;
                this.player.velocity.x = -1.4;
                this.player.lastKey = "right";
                break;
    
            case 38:
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
                this.player.keys.left.pressed = false;
                this.player.velocity.x = 0;
                break;

            case 40:
                this.player.keys.down.pressed = false;
                this.player.velocity.y = 0;
                break;

            case 39:
                this.player.keys.right.pressed = false
                this.player.velocity.x = 0
                break;

            case 38:
                this.player.keys.up.pressed = false;
                this.player.velocity.y = 0;
                break;
        }
    }

    playAgainScreen(e){  
        // e.preventDefault();  this doesnt allow github link to be clicked
        if (this.gameOver) {
            this.gameOver = true;
            this.gameRunning = false;
            let newGame = new Game(this.ctx, this.fogctx);  // is there a better way?
            newGame.animate();
        }
    }

    
    gameStart() {
        this.gameRunning = true;
        //this should include health drain. it is currently in game.draw
    }


    showWin() {
        this.gameOver = true;
        this.gameRunning = false;
        this.ctx.clearRect(0, 0, 1400, 700);
        this.fogctx.clearRect(0, 0, 1400, 700);
        this.drawPlayAgainBG();
        this.drawVictory();
        this.drawPlayAgain();
        this.drawTextWin();
    }


    showLost() {
        this.gameOver = true;
        this.gameRunning = false;
        this.ctx.clearRect(0, 0, 1400, 700);
        this.fogctx.clearRect(0, 0, 1400, 700);
        this.drawPlayAgainBG();
        this.drawLost();
        this.drawPlayAgain();
        this.drawTextLost();
    }


    
    drawFog() {
        this.fogctx.fillStyle = "black";
        this.fogctx.fillRect(0, 0, 1200, 700);
        this.fogctx.globalCompositeOperation = "destination-out";
        //this makes the circle follow player
        let fogCircle = this.fogctx.createRadialGradient(this.player.position.x + 20, this.player.position.y + 20, this.lightRadius, this.player.position.x + 20, this.player.position.y + 20, this.lightRadius / 2 );
        fogCircle.addColorStop(0, "rgba(0, 0, 0, 0)");
        fogCircle.addColorStop(1, "rgba(0, 0, 0, 1)");
        this.fogctx.fillStyle = fogCircle;
        this.fogctx.beginPath();
        this.fogctx.arc(this.player.position.x + 20, this.player.position.y + 20, this.lightRadius, 0, 2 * Math.PI); //this is drawing the circle
        this.fogctx.closePath();
        this.fogctx.fill();
        this.fogctx.globalCompositeOperation = "source-over";
    }
    
    draw() {
        this.player.draw();
        this.maze.draw();
        this.healthBar.draw();
        // this.healthBar.updateHealth(-0.5); // this works, but need to adjust and move somewhere else?
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
        animateId = requestAnimationFrame(this.animate.bind(this)) // save to var so we can cancel later
        this.ctx.clearRect(0, 0, 1400, 700);

        // this.drawFog();

        //drawing background
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 1200, 700)
        this.ctx.strokeStyle = "black"
        this.ctx.stroke();
        this.ctx.fillStyle = "rgb(45, 45, 45)";
        this.ctx.fill();
        
        //draws objects
        this.draw();

        //updating player movement
        this.player.update();

        
        //checking for collision with car. game should end if this is true, render win screen
        if (this.checkCollision(this.player, this.maze.car)) {
            this.gameOver = true;
            cancelAnimationFrame(animateId);
            this.showWin();
        }
        
        //game is lost. render lost screen
        if (this.healthBar.health === 0) {
            this.gameOver = true;
            cancelAnimationFrame(animateId);
            this.showLost();
        }

        //check for collision with items
        this.maze.items.forEach(item => {
            if (this.checkCollision(this.player, item)) {
                this.healthBar.updateHealth(150);
                this.burp.play();
                item.position.x = 3000; // moves item off canvas
            };
        })
    }



    // ctx.drawImage(image, sourcex, sy, sWidth, sHeight, destinationx, dy, dWidth, dHeight);
    drawVictory() {
        this.ctx.drawImage(this.victory, 490, 100);
    }

    drawPlayAgain() {
        this.ctx.drawImage(this.playAgain, 450, 250, 400, 100);
    }

    drawLost() {
        this.ctx.drawImage(this.lost, 480, 100);
    }

    drawPlayAgainBG() {
        this.ctx.drawImage(this.playAgainBG, 0, 0, 1400, 700);
    }

    drawTextWin() {
        this.ctx.font = "48px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`You won with ${this.healthBar.health} health remaining!`, 290, 450);

        this.ctx.font = "48px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Thank you for getting Bob home safely!", 270, 550);
    }

    drawTextLost() {
        this.ctx.font = "48px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Bob blacked out...", 460, 450);
    }
}


module.exports = Game;