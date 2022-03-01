import Game from "./scripts/game";
import Menu from "./scripts/menu";


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 1400;
    canvas.height = 700;


    // const game = new Game(ctx);
    // game.animate();

    const menu = new Menu(ctx);
    menu.animate();
})





