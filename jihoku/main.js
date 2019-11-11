const sensor = new Magnetometer();
sensor.start();

sensor.addEventListener('reading', () => {
   console.log(sensor.x);
   console.log(sensor.y);
   console.log(sensor.z);
});

function main() {
   var cont = document.getElementById("content");
   cont.innerHTML = sensor.x + " " + sensor.y;
}

window.onload = function () {
   main();
};
