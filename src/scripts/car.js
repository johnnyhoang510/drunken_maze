

class Car {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 33;
        this.height = 68;
    }

    draw() {
        let carImg = new Image();
        carImg.src = 'src/images/taxi2.png';
        this.ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    }


}


module.exports = Car;