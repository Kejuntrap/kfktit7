
function main() {
    let canvas = document.getElementById('sample');
    let ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;
    ctx.font = "24px serif";
    ctx.fillText("田川後藤寺", 360, 360);
    ctx.arc(360, 360, 357, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    ctx.stroke();
}

window.onload = function () {
    main();
};