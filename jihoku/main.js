var magneticSensor = tizen.sensorservice.getDefaultSensor("MAGNETIC");

function onGetSuccessCB(sensorData) {
   console.log("Magnetic field of the X axis: " + sensorData.x);
   console.log("Magnetic field of the Y axis: " + sensorData.y);
   console.log("Magnetic field of the Z axis: " + sensorData.z);
   var cont = document.getElementById("content");
   cont.innerHTML = sensorData.x + " " + sensorData.y;
}

function onerrorCB(error) {
   console.log("Error occurred");
}

function onsuccessCB() {
   console.log("Sensor start");
   magneticSensor.getMagneticSensorData(onGetSuccessCB, onerrorCB);
}

magneticSensor.start(onsuccessCB);