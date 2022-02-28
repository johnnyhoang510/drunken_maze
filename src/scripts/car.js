

class Car {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.position = {
            x: x,
            y: y
        }
        this.width = 35;
        this.height = 65;
    }

    draw() {
        let carImg = new Image();
        carImg.src = 'src/images/car.png';
        this.ctx.drawImage(carImg, this.position.x, this.position.y, this.width, this.height);
    }


}


module.exports = Car;