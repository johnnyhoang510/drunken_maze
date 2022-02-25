document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas1.width = 500;
    canvas1.height = 500;

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();
})


