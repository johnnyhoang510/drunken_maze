const Game = require("./game");


class Menu {
    constructor(ctx, fogctx) {
        this.ctx = ctx;
        this.fogctx = fogctx;
        this.mainMenu = new Image();
        this.mainMenu.src = "src/images/bg.png";
        this.mainTitle = new Image();
        this.mainTitle.src = "src/images/mainheader.png";
        this.howToPlay = new Image();
        this.howToPlay.src = "src/images/howtoplay.png";
        this.clickToStart = new Image();
        this.clickToStart.src = "src/images/clicktostart.png";
        this.atMainMenu = true;
        
        this.createGame = new Game(this.ctx, this.fogctx);

        window.addEventListener("click", this.startGame.bind(this));
    }

    startGame(e) {
        e.preventDefault();
        this.atMainMenu = false;
        // this.createGame.music.play(); //------ WORKS!
        this.createGame.animate();
    }

    draw() {
        this.ctx.drawImage(this.mainMenu, 0, 0, 1400, 700);
        this.ctx.drawImage(this.mainTitle, 230, 40)
        this.ctx.drawImage(this.howToPlay, 440, 300);
        this.ctx.drawImage(this.clickToStart, 290, 600);

    }

    animate() {
        let animateId;
        animateId = requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, 1400, 700);
        this.fogctx.clearRect(0, 0, 1400, 700);

        this.draw();
        this.drawText();

        //this leaves menu and starts the game
        if (!this.atMainMenu) {
            cancelAnimationFrame(animateId);
        }
    }

    drawText() {
        this.ctx.font = "30px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("HELP! Bob had one too many drinks and needs to get home...", 287, 240);

        this.ctx.font = "30px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Can you safely guide him out the maze and into his ride home?", 287, 285);

        this.ctx.font = "30px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Use the arrow keys to navigate Bob around the maze", 300, 410);

        this.ctx.font = "30px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Bob's health gradually decreases...", 420, 461);

        this.ctx.font = "30px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Collect bottles of water to heal/sober Bob up", 350, 512);

        this.ctx.font = "30px fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("If his health hits 0, YOU LOSE!", 430, 563);
    }
}


module.exports = Menu;