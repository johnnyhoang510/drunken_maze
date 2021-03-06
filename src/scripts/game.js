const Player = require("./player");
const Maze = require("./maze");
const HealthBar = require("./healthbar");


class Game {
    constructor(ctx, fogctx) {
        this.ctx = ctx;
        this.fogctx = fogctx;
        this.lightRadius = 80;
        this.gameRunning = false; // want to start at main menu
        this.gameOver = false;
        this.player = new Player(this.ctx);
        this.maze = new Maze(this.ctx);

        // constructor(ctx, x, y, width, height, health, maxHealth, color) {
        this.healthBar = new HealthBar(this.ctx, 1220, 100, 130, 30, 2250, 2250, "green");
        this.healthBar.color = "green";
        
        this.music = new Audio();
        this.music.src = "src/images/audio.mp3";
        this.music.loop = true;
        this.music.volume = 0.1;

        this.burp = new Audio();
        this.burp.src = "src/images/burp.mp3";
        this.burp.volume = 0.3;

        this.victory = new Image();
        this.victory.src = "src/images/youwin.png";
        this.lost = new Image();
        this.lost.src = "src/images/youlose.png";
        this.playAgain = new Image();
        this.playAgain.src = "src/images/pressEnter.png";
        this.playAgainBG = new Image();
        this.playAgainBG.src = "src/images/bg.png";


        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));

        // window.addEventListener("keydown", this.playAgainScreen.bind(this));
    }


    keyDown(e) {
        let kc = e.keyCode;
        e.preventDefault();

        if (kc === 37) {
            this.player.keys.left.pressed = true;
            this.player.velocity.x = 1.4;
            this.player.velocity.y = 0;
            this.player.lastKey = "left";
        } else if (kc === 40) {
            this.player.keys.down.pressed = true;
            this.player.velocity.y = -1.4;
            this.player.velocity.x = 0;
            this.player.lastKey = "down";
        } else if (kc === 39) {
            this.player.keys.right.pressed = true;
            this.player.velocity.x = -1.4;
            this.player.velocity.y = 0;
            this.player.lastKey = "right";
        } else if (kc === 38) {
            this.player.keys.up.pressed = true;
            this.player.velocity.y = 1.4;
            this.player.velocity.x = 0;
            this.player.lastKey = "up";
        }
    }


    keyUp(e) {
        let kc = e.keyCode;
        e.preventDefault();

        if (kc === 37) {
            this.player.keys.left.pressed = false;
            this.player.velocity.x = 0;
            this.player.velocity.y = 0;
            this.player.lastKey = "left";
        } else if (kc === 40) {
            this.player.keys.down.pressed = false;
            this.player.velocity.y = 0;
            this.player.velocity.x = 0;
            this.player.lastKey = "down";
        } else if (kc === 39) {
            this.player.keys.right.pressed = false;
            this.player.velocity.x = 0;
            this.player.velocity.y = 0;
            this.player.lastKey = "right";
        } else if (kc === 38) {
            this.player.keys.up.pressed = false;
            this.player.velocity.y = 0;
            this.player.velocity.x = 0;
            this.player.lastKey = "up";
        }
    }


    // playAgainScreen(e){
    //     // if (!this.gameRunning) return null;
    //     // console.log(this, "why am i hitting this")
    //     e?.preventDefault();  // this doesnt allow github link to be clicked?
    //     if (this.gameOver) {
    //         if (e.keyCode === 13 && !this.gameRunning) {
    //             // this.gameOver = true;
    //             // this.gameRunning = false;
    //             // let newGame = new Maze(this.ctx);  // is there a better way?
    //             this.player = new Player(this.ctx);
    //             this.maze = new Maze(this.ctx);
    //             this.gameStart();
    //             this.animate();
    //         }
    //     }
    // }

    
    gameStart() {
        this.gameRunning = true;
    }


    showWin() {
        this.gameOver = true;
        this.gameRunning = false;
        this.ctx.clearRect(0, 0, 1400, 700);
        this.fogctx.clearRect(0, 0, 1400, 700);
        document.getElementById("tips").style.visibility = "hidden";
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
        document.getElementById("tips").style.visibility = "hidden";
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
        let fogCircle = this.fogctx.createRadialGradient(this.player.x + 20, this.player.y + 20, this.lightRadius, this.player.x + 20, this.player.y + 20, this.lightRadius / 2 );
        fogCircle.addColorStop(0, "rgba(0, 0, 0, 0)");
        fogCircle.addColorStop(1, "rgba(0, 0, 0, 1)");
        this.fogctx.fillStyle = fogCircle;
        this.fogctx.beginPath();
        this.fogctx.arc(this.player.x + 20, this.player.y + 20, this.lightRadius, 0, 2 * Math.PI); //this is drawing the circle
        this.fogctx.closePath();
        this.fogctx.fill();
        this.fogctx.globalCompositeOperation = "source-over";
    }
    

    draw() {
        this.player.draw();
        this.maze.draw();
        this.healthBar.draw();
        if (!this.gameOver) {
            this.healthBar.updateHealth(-0.5);
        }
    }

    toggleMusic() {
        const audioButton = document.getElementById("audio-button")
        const audio = document.getElementById("audio");
        audioButton.onclick = () => {
            audioButton.classList.toggle('active')
            if (audio.paused) {
                document.getElementById("audio-button").src = "src/images/unmuted.png"
                audio.play()
                audio.volume = 0.1;
            } else {
                document.getElementById("audio-button").src = "src/images/muted.png"
                audio.pause()
            }
        }
    }

    checkCollision(obj1, obj2) { // obj1 will be player
        if (
            (obj1.x + obj1.width) >= obj2.x &&
            obj1.x <= (obj2.x + obj2.width) &&
            (obj1.y + obj1.height) >= obj2.y &&
            obj1.y <= (obj2.y + obj2.height)
        ) {
            return true;
        }
    }

    animate() {

        this.toggleMusic();

        let animateId;
        animateId = requestAnimationFrame(this.animate.bind(this)) // save to var so we can cancel later
        this.ctx.clearRect(0, 0, 1400, 700);

        this.drawFog();

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


        // change health color
        if (this.healthBar.health < 900) {
            this.healthBar.color = "red";
        }

        //checking for collision with car. game should end if this is true, render win screen
        if (this.checkCollision(this.player, this.maze.car)) {
            this.gameOver = true;
            this.gameRunning = false;
            cancelAnimationFrame(animateId);
            this.showWin();
        }
        
        //game is lost. render lost screen
        if (this.healthBar.health === 0) {
            this.gameOver = true;
            this.gameRunning = false;
            cancelAnimationFrame(animateId);
            this.showLost();
        }

        //check for collision with items
        this.maze.items.forEach(item => {
            if (this.checkCollision(this.player, item)) {
                this.healthBar.updateHealth(310);
                this.lightRadius += 15
                this.burp.play();
                item.x = 3000; // moves item off canvas
            };
        })

        this.maze.beers.forEach(beer => {
            if (this.checkCollision(this.player, beer)) {
                this.lightRadius -= 15;
                this.burp.play();
                beer.x = 2500;
            }
        })

        // player.y = obj2.y + obj2.height   ---> checks for vert
        // player.x = obj2.x + obj2.width ----> checks for hori
        // two separate checks: 1 for vert wall, 1 for hori wall
        this.maze.horiObjects.forEach(wall => {
            if (this.checkCollision(this.player, wall)) {
                if (this.player.lastKey === "down") {
                    this.player.y = wall.y + wall.height;
                    this.player.keys.down.pressed = false; 
                    this.player.animationCount = 0; // stops frame from switching
                    this.player.velocity.x = 0;
                } else if (this.player.lastKey === "up") {
                    this.player.y = wall.y - wall.height; // if char is coming from top, this will keep them above the obj
                    this.player.keys.up.pressed = false;
                    this.player.animationCount = 0;
                    this.player.velocity.x = 0;
                }
            }
        })

        this.maze.vertObjects.forEach(wall => {
            if (this.checkCollision(this.player, wall)) {
                if (this.player.lastKey === "right") {
                    this.player.x = wall.x + wall.width;
                    this.player.keys.right.pressed = false;
                    this.player.animationCount = 0;
                    this.player.velocity.x = 0;

                } else if (this.player.lastKey === "left") {
                    this.player.x = wall.x - wall.width; // if coming from left, keeps them on left side
                    this.player.keys.left.pressed = false;
                    this.player.animationCount = 0;
                    this.player.velocity.x = 0;
                }
            }
        })
    }


    // ctx.drawImage(image, sourcex, sy, sWidth, sHeight, destinationx, dy, dWidth, dHeight);
    drawVictory() {
        this.ctx.drawImage(this.victory, 520, 100);
    }

    drawPlayAgain() {
        this.ctx.drawImage(this.playAgain, 420, 250, 520, 100);
    }

    drawLost() {
        this.ctx.drawImage(this.lost, 510, 100);
    }

    drawPlayAgainBG() {
        this.ctx.drawImage(this.playAgainBG, 0, 0, 1400, 700);
    }

    drawTextWin() {
        this.ctx.font = "48px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`You won with ${this.healthBar.health} health remaining!`, 320, 450);

        this.ctx.font = "48px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Thank you for getting Bob home safely!", 290, 550);
    }

    drawTextLost() {
        this.ctx.font = "48px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Bob blacked out...", 490, 450);
    }
}



module.exports = Game;