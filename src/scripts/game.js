

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameRunning = false;
        this.gameOver = false;


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
}