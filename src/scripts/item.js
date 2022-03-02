

class Item {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        
        this.width = 20;
        this.height = 33;
    }
    

    draw() {
        let waterImg = new Image();
        waterImg.src = 'src/images/water.png';
        this.ctx.drawImage(waterImg, this.x, this.y, this.width, this.height);
    }
}


module.exports = Item;