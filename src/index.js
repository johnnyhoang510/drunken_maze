import Game from "./scripts/game";


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 1400;
    canvas.height = 700;


    const game = new Game(ctx);
    game.animate();

    console.log("YOO");

})





