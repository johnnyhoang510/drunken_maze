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
        }

        draw() {
            let wallImg = new Image();
            wallImg.src = 'src/images/spikes.png';

            //top wall
            for (let x = 0; x <= 1152; x += 48) {
                ctx.drawImage(wallImg, x, 0, 48, 48);
            }

             // top wall
            for (let x = 0; x <= 144; x += 48) {
                ctx.drawImage(wallImg, x, 150, 48, 48);
            }
            
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
            // obj1.velocity.x = 0;   // this will stop player from moving. need to refactor
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





