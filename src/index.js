
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 1400;
    canvas.height = 700;


    class Player {
        constructor() {
            this.position = {
                x: 75,
                y: 75
            }
            this.width = 50;
            this.height = 50;
            this.velocity = {
                x: 0,
                y: 0
            }
        }

        draw() {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }

        update() {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }


    class Wall {
        constructor() {
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

            let carImg = new Image();
            carImg.src = 'src/images/car.png';

            let waterImg = new Image();
            waterImg.src = 'src/images/water.png';

            let beerImg = new Image();
            beerImg.src = 'src/images/beer.png';

            //top spikes
            for (let x = 32; x <= 1104; x += 48) {
                ctx.drawImage(spikesDown, x, 32);
            }
            ctx.drawImage(spikesDown, 1135, 32, 33, 48);

             // inner start wall
            for (let x = 32; x <= 144; x += 48) {
                ctx.drawImage(spikesUp, x, 150);
            }
            
            for (let y = 183; y <= 321; y += 46) {
                ctx.drawImage(spikesRight, 177, y);
            }


            // bottom left x
            for (let x = 200; x <= 450; x += 46) {
                ctx.drawImage(spikesUp, x, 500);
            }


            // middle left y
            for (let y = 623; y >= 150; y -= 46) {
                ctx.drawImage(spikesLeft, 445, y);
            }

            // far right y
            for (let y = 100; y <= 300; y += 46) {
                ctx.drawImage(spikesLeft, 1000, y);
            }

            //far right x
            for (let x = 800; x <= 1122; x += 46) {
                ctx.drawImage(spikesUp, x, 300); 
            }


            // middle right y
            for (let y = 100; y <= 400; y += 46) {
                ctx.drawImage(spikesLeft, 752, y);
            }

            
            // far right bottom x
            for (let x = 785; x <= 1070; x += 46) {
                ctx.drawImage(spikesDown, x, 570);
            }


            // y wall near end
            for (let y = 350; y <= 530; y += 46) {
                ctx.drawImage(spikesLeft, 1060, y);
            }
            ctx.drawImage(spikesLeft, 1060, 534, 48, 34);


            // middle y
            for (let y = 623; y >= 150; y -= 46) {
                ctx.drawImage(spikesRight, 640, y);
            }


            for (let x = 785; x <= 1030; x += 46) {
                ctx.drawImage(spikesUp, x, 450);
            }
            ctx.drawImage(spikesUp, 1062, 450, 30, 48);

            // -------------- BRICK WALLS -----------------

            // top brick wall
            for (let x = 32; x <= 1000; x += 256) {
                ctx.drawImage(brickWall, x, 0)
            }
            ctx.drawImage(brickWall, 1024, 0, 144, 32);

            //bottom brick wall
            for (let x = 32; x <= 1000; x+= 256) {
            ctx.drawImage(bottomWall, x, 670);
            }
            ctx.drawImage(bottomWall, 1024, 670, 144, 32);

            // right brick wall
            ctx.drawImage(rightWall, 1168, 0);
            ctx.drawImage(rightWall, 1168, 124);
            ctx.drawImage(rightWall, 1168, 500, 32, 200);


            // left brick wall
            ctx.drawImage(leftWall, 0, 0, 32, 45);
            ctx.drawImage(leftWall, 0, 185);
            ctx.drawImage(leftWall, 0, 442);

            //car
            ctx.drawImage(carImg, 1164, 410, 35, 65);

            //water image, test
            ctx.drawImage(waterImg, 440, 555, 20, 35);

            //beer image, test
            ctx.drawImage(beerImg, 440, 610, 20, 35);
        }
    }


    const player = new Player();
    const wall = new Wall();


    //helper func for collision. first two checks x axis, other two checks y axis
    function checkCollision(obj1, obj2) {
        if (
            (obj1.position.x + obj1.width) >= obj2.position.x &&
            obj1.position.x <= (obj2.position.x + obj2.width) &&
            (obj1.position.y + obj1.height) >= obj2.position.y &&
            obj1.position.y <= (obj2.position.y + obj2.height)
            ) {
            console.log("colliding")
            // obj1.velocity.x = 0;   // this will stop player from moving. need to adjust to freeze keys
            // obj1.velocity.y = 0;
            return true   
        }
    }

    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        },
        up: {
            pressed: false
        },
        down: {
            pressed: false
        }
    };

    // drawing wall
    
    function animate() {
        requestAnimationFrame(animate) // argument is func we want to loop
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        checkCollision(player, wall); //helper func to check collision. returns true and sets velo to 0
        
        //drawing background
        ctx.beginPath();
        ctx.rect(0, 0, 1200, 700)
        ctx.strokeStyle = "black"
        ctx.stroke();
        ctx.fillStyle = "rgb(45, 45, 45)";
        ctx.fill();
        
        //drawing player
        player.update();
        wall.draw();

        
        // reset velocity x if keys are lifted
        if (keys.right.pressed) {
            player.velocity.x = -1.4;
        } else if (keys.left.pressed) {
            player.velocity.x = 1.4;
        } else {
            player.velocity.x = 0;
        }

        // reset velocity y if keys are lifted
        if (keys.up.pressed) {
            player.velocity.y = 1.4;
        } else if (keys.down.pressed) {
            player.velocity.y = -1.4;
        } else {
            player.velocity.y = 0;
        }

    }

    animate();


    // event listeners
    addEventListener('keydown', ({ keyCode }) => {   //when a key is pressed
        // console.log(event); // keycodes: left37, down40, right39, up38

        switch (keyCode) {
            case 37:
                // console.log('left')
                keys.left.pressed = true;
                break;

            case 40:
                // console.log('down')
                keys.down.pressed = true;
                break

            case 39:
                // console.log('right')
                keys.right.pressed = true;
                break

            case 38:
                // console.log('up')
                keys.up.pressed = true;
                break
        }
    }) 

    addEventListener('keyup', ({ keyCode }) => {   //when a key is lifted
        // console.log(event); // keycodes: left37, down40, right39, up38

        switch (keyCode) {
            case 37:
                // console.log('left');
                keys.left.pressed = false;
                break;

            case 40:
                // console.log('down');
                keys.down.pressed = false
                break;

            case 39:
                // console.log('right');
                keys.right.pressed = false
                break;

            case 38:
                // console.log('up');
                keys.up.pressed = false
                break;
        }
    })

    


})





