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
    

    // drawing background
    // function drawBase() {
    //     let base_image = new Image();
    //     base_image.src = 'src/images/BGvector02.png';
    //     ctx.drawImage(base_image, 0, 0);
    //     base_image.onload = function () {
    //         ctx.drawImage(base_image, 0, 0);
    //     }
    // }


    function drawCharacter() {
        let mainChar = new Image();
        // mainChar.src = 'src/images/char_sprites.png';  --> need to resize?
        mainChar.src = 'src/images/character.png';
        ctx.drawImage(mainChar, 200, 200);
        mainChar.onload = function () {
            ctx.drawImage(mainChar, 200, 200);
        }
    }

    // drawing wall
    function drawWall() {
        let wallImg = new Image();
        wallImg.src = 'src/images/wall.png';
        ctx.drawImage(wallImg, 100, 100);
        wallImg.onload = function () {
            ctx.drawImage(wallImg, 100, 100);
        }
    }
})





