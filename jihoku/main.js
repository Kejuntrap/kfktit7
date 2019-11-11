let sensor = new Magnetometer();
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

function handlePermission() {
   navigator.permissions.query({ name: 'magnetometer' }).then(function (result) {
      if (result.state == 'granted') {
         alert("granted");
      } else if (result.state == 'prompt') {
         alert("prompt");
      } else if (result.state == 'denied') {
         alert("denied");
      }
   });
}
handlePermission();