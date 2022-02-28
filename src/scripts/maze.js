

class Maze {
    constructor(ctx) {
        this.ctx = ctx;
        this.position = {
            x: 150,
            y: 150
        }
        this.width = 48;
        this.height = 48;
        this.objects = [];
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


        let waterImg = new Image();
        waterImg.src = 'src/images/water.png';

        let beerImg = new Image();
        beerImg.src = 'src/images/beer.png';

        //top spikes
        // for (let x = 32; x <= 1104; x += 48) {
        //     ctx.drawImage(spikesDown, x, 32);
        // }
        // ctx.drawImage(spikesDown, 1135, 32, 33, 48);

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
        for (let y = 100; y <= 400; y += 46) {
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


        for (let x = 785; x <= 1030; x += 46) {
            this.ctx.drawImage(spikesUp, x, 450);
        }
        this.ctx.drawImage(spikesUp, 1062, 450, 30, 48);

        // -------------- BRICK WALLS -----------------

        // top brick wall
        for (let x = 32; x <= 1000; x += 256) {
            this.ctx.drawImage(brickWall, x, 0)
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




        

        //water image, test
        this.ctx.drawImage(waterImg, 440, 555, 20, 33);

        //beer image, test
        this.ctx.drawImage(beerImg, 440, 615, 20, 32);
    }
}


module.exports = Maze;