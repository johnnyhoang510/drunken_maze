

class Car {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 65;
    }

    draw() {
        let carImg = new Image();
        carImg.src = 'src/images/car.png';
        this.ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    }


}


module.exports = Car;