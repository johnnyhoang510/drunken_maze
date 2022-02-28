import Player from "./scripts/player";
import Maze from "./scripts/maze";
import Car from "./scripts/car";
import Wall from "./scripts/wall";



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 1400;
    canvas.height = 700;


        
    const player = new Player(ctx);
    const maze = new Maze(ctx);
    const car = new Car(ctx, 1164, 392);

    

    //helper func for collision. first two checks x axis, other two checks y axis
    function checkCollision(obj1, obj2) {
        if (
            (obj1.position.x + obj1.width) >= obj2.position.x &&
            obj1.position.x <= (obj2.position.x + obj2.width) &&
            (obj1.position.y + obj1.height) >= obj2.position.y &&
            obj1.position.y <= (obj2.position.y + obj2.height)
            ) {
            console.log("colliding")
            // obj1.velocity.x = 0;   // this will stop player from moving. need to adjust to freeze keys?
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



    

    // need to maybe separate player from maze
    function animate() {
        requestAnimationFrame(animate) // argument is func we want to loop
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        checkCollision(player, car); //helper func to check collision. returns true and sets velo to 0
        
        //drawing background
        ctx.beginPath();
        ctx.rect(0, 0, 1200, 700)
        ctx.strokeStyle = "black"
        ctx.stroke();
        ctx.fillStyle = "rgb(45, 45, 45)";
        ctx.fill();
        


        //updating player movement
        player.update();
        
        maze.draw(); // why do these 2 need to be in here??
        car.draw();
        
        // // reset velocity x if keys are lifted
        // if (keys.right.pressed) {
        //     player.velocity.x = -1.4;
        // } else if (keys.left.pressed) {
        //     player.velocity.x = 1.4;
        // } else {
        //     player.velocity.x = 0;
        // }

        // // reset velocity y if keys are lifted
        // if (keys.up.pressed) {
        //     player.velocity.y = 1.4;
        // } else if (keys.down.pressed) {
        //     player.velocity.y = -1.4;
        // } else {
        //     player.velocity.y = 0;
        // }

    }

    // console.log(maze.wallObjects);
    animate();

    // event listeners
    addEventListener('keydown', ({ keyCode }) => {   //when a key is pressed
        // console.log(event); // keycodes: left37, down40, right39, up38

        switch (keyCode) {
            case 37:
                // console.log('left')
                keys.left.pressed = true;
                player.velocity.x = 1.4;
                break;

            case 40:
                // console.log('down')
                keys.down.pressed = true;
                player.velocity.y = -1.4;
                break

            case 39:
                // console.log('right')
                keys.right.pressed = true;
                player.velocity.x = -1.4;
                break

            case 38:
                // console.log('up')
                keys.up.pressed = true;
                player.velocity.y = 1.4;
                break
        }
    }) 

    addEventListener('keyup', ({ keyCode }) => {   //when a key is lifted
        // console.log(event); // keycodes: left37, down40, right39, up38

        switch (keyCode) {
            case 37:
                // console.log('left');
                keys.left.pressed = false;
                player.velocity.x = 0;
                break;

            case 40:
                // console.log('down');
                keys.down.pressed = false;
                player.velocity.y = 0;
                break;

            case 39:
                // console.log('right');
                keys.right.pressed = false
                player.velocity.x = 0
                break;

            case 38:
                // console.log('up');
                keys.up.pressed = false;
                player.velocity.y = 0;
                break;
        }
    })

    console.log("YOO");


})





