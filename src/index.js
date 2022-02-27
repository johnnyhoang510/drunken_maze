// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('canvas1');
//     const ctx = canvas.getContext('2d');
//     console.log(ctx);
//     canvas1.width = 1300;
//     canvas1.height = 700;


// function drawWall() {
//     let wallImg = new Image();
//     wallImg.src = 'src/images/wall.png';
//     wallImg.onload = function () {
//         ctx.drawImage(wallImg, 100, 100, 50, 50);
//     }
// }

// console.log(drawWall());

    
//     // drawBase();
//     drawWall();
//     drawCharacter();
//     drawItem();

//     // drawing background
//     // function drawBase() {
//     //     let base_image = new Image();
//     //     base_image.src = 'src/images/background.png';
//     //     base_image.onload = function () {
//     //         ctx.drawImage(base_image, 0, 0);
//     //     }
//     // }


//     function drawCharacter() {
//         let mainChar = new Image();
//         // mainChar.src = 'src/images/char_sprites.png';  --> need to resize?
//         mainChar.src = 'src/images/character.png';
//         mainChar.onload = function () {
//             // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)  source height,width 
//             // use last 4 to display whole img
//             ctx.drawImage(mainChar, 200, 200);
//         }
//     }

//     // drawing wall
//     function drawWall() {
//         let wallImg = new Image();
//         wallImg.src = 'src/images/wall.png';
//         wallImg.onload = function () {
//             ctx.drawImage(wallImg, 100, 100, 50, 50);
//         }
//     }

//     function drawItem() {
//         let itemImg = new Image();
//         itemImg.src = 'src/images/flasks_3_2.png';  // need a bigger item
//         itemImg.onload = function() {
//             ctx.drawImage(itemImg, 250, 250);
//         }
//     }
    
// })

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

  

    class Player {
        constructor() {
            this.position = {
                x: 100,
                y: 100
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
                x: 200,
                y: 100
            }
            this.width = 200;
            this.height = 10;
        }

        draw() {
            // ctx.fillStyle = 'blue';
            // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            let wallImg = new Image();
            wallImg.src = 'src/images/spikes.png';
            ctx.drawImage(wallImg, 150, 150, 48, 48);
        }
    }


    const player = new Player();
    const wall = new Wall();


    // function checkCollision(obj1, obj2) {
    //     if (
    //         (player.position.x + player.width) >= wall.position.x &&
    //         player.position.x <= (wall.position.x + wall.width) &&
    //         (player.position.y + player.height) >= wall.position.y &&
    //         player.position.y <= (wall.position.y + wall.height)
    //         ) {
    //         console.log("colliding")
    //         return true   //first two checks x axis, other two checks y axis
    //     }
    // }

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

        // if (
        //     player.position.x + player.width >= wall.position.x &&
        //     player.position.x <= (wall.position.x + wall.width) &&
        //     (player.position.y + player.height) >= wall.position.y &&
        //     player.position.y <= (wall.position.y + wall.height)
        // ) {
        //     console.log("colliding")
        //     // return true   //first two checks x axis, other two checks y axis
        // }

        if (
            player.position.x + player.width >= wall.position.x) {
            console.log("colliding")
            // return true   //first two checks x axis, other two checks y axis
        }

        
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



        
        // reset velocity if keys are lifted
        if (keys.right.pressed) {
            player.velocity.x = -1;
        } else if (keys.left.pressed) {
            player.velocity.x = 1;
        } else {
            player.velocity.x = 0;
        }

        if (keys.up.pressed) {
            player.velocity.y = 1;
        } else if (keys.down.pressed) {
            player.velocity.y = -1;
        } else {
            player.velocity.y = 0;
        }

    }

    
    animate();


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

    addEventListener('keyup', ({ keyCode }) => {   //when a key is pressed
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





