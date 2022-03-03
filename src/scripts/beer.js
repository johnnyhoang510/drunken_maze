

class Beer {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.width = 20;
        this.height = 33;
    }


    draw() {
        let beerImg = new Image();
        beerImg.src = 'src/images/beer.png';
        this.ctx.drawImage(beerImg, this.x, this.y, this.width, this.height);
    }
}


module.exports = Beer;