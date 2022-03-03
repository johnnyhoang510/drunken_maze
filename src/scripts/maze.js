const Item = require("./item");
const Car = require("./car");
const Beer = require("./beer");

class Maze {
    constructor(ctx) {
        this.ctx = ctx;
        this.car = new Car(this.ctx, 1165, 392);
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
        
        this.beers = [];
        this.beer1 = new Beer(this.ctx, 350, 200);
        this.beer2 = new Beer(this.ctx, 360, 555);
        this.beer3 = new Beer(this.ctx, 512, 400);
        this.beer4 = new Beer(this.ctx, 920, 280);
        this.beer5 = new Beer(this.ctx, 1134, 625);
        this.beers.push(this.beer1);
        this.beers.push(this.beer2);
        this.beers.push(this.beer3);
        this.beers.push(this.beer4);
        this.beers.push(this.beer5);


        this.horiObjects = [];
        this.vertObjects = []; // create coords as objects instead of initializing as wall obj
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

        this.beer1.draw();
        this.beer2.draw();
        this.beer3.draw();
        this.beer4.draw();
        this.beer5.draw();

        // creating coord objects
        this.horiObjects = [
            {x: 0, y: -10, width: 1250, height: 40}, // top brick wall
            {x: 0, y: 170, width: 180, height: 40}, // start spikes
            {x: 210, y: 510, width: 250, height: 40}, // bottom left x
            {x: 800, y: 315, width: 360, height: 40.1}, // far right x
            {x: 789, y: 550, width: 320, height: 40}, // far right bottom x
            {x: 32, y: 660, width: 1112, height: 40}, // bottom brick wall
            {x: 181, y: 330, width: 10, height: 40}, // inner y cover
            {x: 483, y: 150, width: 10, height: 40}, // middle left y cover
            {x: 653, y: 155, width: 10, height: 40}, // middle y cover
            {x: 790, y: 90, width: 10, height: 40}, // middle right y top cover
            {x: 790, y: 340, width: 10, height: 40}, // middle right y bottom cover
            {x: 1040, y: 81, width: 10, height: 40}, // top right y cover
            
        ]
        
        this.vertObjects = [
            {x: 175, y: 183, width: 40, height: 173}, //inner y
            {x: 475, y: 160, width: 40, height: 463}, //middle left y
            {x: 1020, y: 100, width: 40, height: 200}, //far right y
            {x: 775, y: 100, width: 40, height: 263}, //middle right y
            {x: 1076, y: 350, width: 41, height: 214}, //near end y
            {x: 630, y: 160, width: 40, height: 490}, //middle y
            {x: 1178, y: 0, width: 40, height: 388}, //right brick wall upper
            {x: 1181, y: 500, width: 40, height: 200}, //right brick wall lower
            {x: -10, y: 180, width: 40, height: 520}, //left brick wall lower
            // {x: 1, y: 1, width: 32, height: 31}, //left brick wall upper
            {x: 207, y: 520, width: 40, height: 20}, // bottom left x cover
            {x: 784, y: 556, width: 40, height: 20}, // bottom right x cover
            {x: -35, y: 20, width: 40, height: 150} // entrance
        ]
        
        // this.drawTips();
    }

    // drawTips() {
    //     this.ctx.font = "40px Cochin";
    //     this.ctx.fillStyle = "black";
    //     this.ctx.fillText("Tips:", 1220, 230);

    //     this.ctx.font = "27px Cochin";
    //     this.ctx.fillStyle = "black";
    //     this.ctx.fillText("Water bottles can help increase visibility while also regaining health!", 1225, 272);
    // }
}


module.exports = Maze;