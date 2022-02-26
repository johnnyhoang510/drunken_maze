document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas1.width = 1300;
    canvas1.height = 700;

    ctx.beginPath();
    ctx.rect(0, 0, 1200, 700)
    ctx.strokeStyle = "black"
    ctx.stroke();
    ctx.fillStyle = "rgb(45, 45, 45)";
    ctx.fill();

    
    // drawBase();
    drawWall();
    drawCharacter();
    drawItem();

    // drawing background
    // function drawBase() {
    //     let base_image = new Image();
    //     base_image.src = 'src/images/background.png';
    //     base_image.onload = function () {
    //         ctx.drawImage(base_image, 0, 0);
    //     }
    // }


    function drawCharacter() {
        let mainChar = new Image();
        // mainChar.src = 'src/images/char_sprites.png';  --> need to resize?
        mainChar.src = 'src/images/character.png';
        mainChar.onload = function () {
            // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)  source height,width 
            // use last 4 to display whole img
            ctx.drawImage(mainChar, 200, 200);
        }
    }

    // drawing wall
    function drawWall() {
        let wallImg = new Image();
        wallImg.src = 'src/images/wall.png';
        wallImg.onload = function () {
            ctx.drawImage(wallImg, 100, 100, 50, 50);
        }
    }

    function drawItem() {
        let itemImg = new Image();
        itemImg.src = 'src/images/flasks_3_2.png';  // need a bigger item
        itemImg.onload = function() {
            ctx.drawImage(itemImg, 250, 250);
        }
    }
})





