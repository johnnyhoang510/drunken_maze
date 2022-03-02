const Item = require("./item");
const Car = require("./car");


class Maze {
    constructor(ctx) {
        this.ctx = ctx;
        this.car = new Car(this.ctx, 1164, 392);
        this.item1 = new Item(this.ctx, 440, 555);
        this.item2 = new Item(this.ctx, 100, 210);
        this.item3 = new Item(this.ctx, 1100, 290);
        this.item4 = new Item(this.ctx, 600, 590);
        this.item5 = new Item(this.ctx, 1030, 430);
        this.items = [];
        this.items.push(this.item1);
        this.items.push(this.item2);
        this.items.push(this.item3);
        this.items.push(this.item4);
        this.items.push(this.item5);  
        this.objects = []; // create coords as objects? instead of initializing as wall obj
    }

    draw() {
        let spikesUp = new Image();
        spikesUp.src = 'src/images/spikes.png';

        let spikesLeft = new Image();
        spikesLeft.src = 'src/images/spikesleft.png';

        let spikesDown = new Image();
        spikesDown.src = 'src/images/spikesdown.png';

        let spikesRight = new Image();
        spikesRight.src = 'src/images/spikesright.png';

        let brickWall = new Image();
        brickWall.src = 'src/images/wall.png';

        let bottomWall = new Image();
        bottomWall.src = 'src/images/walldown.png';

        let rightWall = new Image();
        rightWall.src = 'src/images/yellowright.png';

        let leftWall = new Image();
        leftWall.src = 'src/images/yellowleft.png';



        // inner start wall
        for (let x = 32; x <= 144; x += 48) {
            this.ctx.drawImage(spikesUp, x, 150);
        }


        for (let y = 183; y <= 321; y += 46) {
            this.ctx.drawImage(spikesRight, 177, y);
        }


        // bottom left x
        for (let x = 200; x <= 450; x += 46) {
            this.ctx.drawImage(spikesUp, x, 500);
        }


        // middle left y
        for (let y = 623; y >= 150; y -= 46) {
            this.ctx.drawImage(spikesLeft, 445, y);
        }


        // far right y
        for (let y = 100; y <= 300; y += 46) {
            this.ctx.drawImage(spikesLeft, 1000, y);
        }


        //far right x
        for (let x = 800; x <= 1122; x += 46) {
            this.ctx.drawImage(spikesUp, x, 300);
        }


        // middle right y
        for (let y = 100; y <= 350; y += 46) {
            this.ctx.drawImage(spikesLeft, 752, y);
        }


        // far right bottom x
        for (let x = 785; x <= 1070; x += 46) {
            this.ctx.drawImage(spikesDown, x, 570);
        }


        // y wall near end
        for (let y = 350; y <= 530; y += 46) {
            this.ctx.drawImage(spikesLeft, 1060, y);
        }
        this.ctx.drawImage(spikesLeft, 1060, 534, 48, 34);


        // middle y
        for (let y = 623; y >= 150; y -= 46) {
            this.ctx.drawImage(spikesRight, 640, y);
        }


        // for (let x = 785; x <= 1030; x += 46) {
        //     this.ctx.drawImage(spikesUp, x, 450);
        // }
        // this.ctx.drawImage(spikesUp, 1062, 450, 30, 48);



        // -------------- BRICK WALLS -----------------

        // top brick wall
        for (let x = 32; x <= 1000; x += 256) {
            this.ctx.drawImage(brickWall, x, 0);
        }
        this.ctx.drawImage(brickWall, 1024, 0, 144, 32);


        //bottom brick wall
        for (let x = 32; x <= 1000; x += 256) {
            this.ctx.drawImage(bottomWall, x, 670);
        }
        this.ctx.drawImage(bottomWall, 1024, 670, 144, 32);


        // right brick wall
        this.ctx.drawImage(rightWall, 1168, 0);
        this.ctx.drawImage(rightWall, 1168, 124);
        this.ctx.drawImage(rightWall, 1168, 500, 32, 200);


        // left brick wall
        this.ctx.drawImage(leftWall, 0, 0, 32, 31);
        this.ctx.drawImage(leftWall, 0, 185);
        this.ctx.drawImage(leftWall, 0, 442);

        // items/car
        this.item1.draw();
        this.item2.draw();
        this.item3.draw();
        this.item4.draw();
        this.item5.draw();
        this.car.draw();


        // creating coord objects
        this.objects = [
            {x: 32, y: 0, w: 1112, h: 32}
        ]
    
    }


    // update() {
    //     this.draw();
    // }
}


module.exports = Maze;