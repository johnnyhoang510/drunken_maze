import Game from "./scripts/game";
import Menu from "./scripts/menu";


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    const fogcanvas = document.getElementById('canvas2');
    const fogctx = fogcanvas.getContext('2d');

    canvas.width = 1400;
    canvas.height = 700;

    fogcanvas.width = 1200;
    fogcanvas.height = 700;



    const game = new Game(ctx, fogctx);
    game.animate();

    // const menu = new Menu(ctx, fogctx);
    // menu.animate();

    
})





