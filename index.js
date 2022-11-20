// Establishing connection with server
var socket = io.connect(); /* global io */

function requestData() {
  socket.emit("requestData", '{"state":"get"}');
}
// var clock = setInterval(requestData, 5000); // Get data every five second

socket.on("getHeaterState", function(data) {
  if (data == 1) {
    document.getElementById("heaterStatus").innerHTML = "Status: ON";
  } else {
    document.getElementById("heaterStatus").innerHTML = "Status: OFF";
  }
});

socket.on("getWindowState", function (data) {
  document.querySelector("#windowStatus").innerHTML = `Status: ${data.toUpperCase()}`;
});

socket.on("getLightLevel", function (data) {
  document.querySelector("#lightStatus").innerHTML = `Current Level: ${data}`;
});

socket.on("currentData", function (data) {
  console.log(data);
});

function changeHeaterState(state) {
    socket.emit("changeHeaterState", state);
}

function changeWindowState(state) {
  if (state == 1) {
    socket.emit("changeWindowState", '{"state":"open"}');
  } else if (state == 0) {
    socket.emit("changeWindowState", '{"state":"close"}');
  }
}

// wait until the DOM is loaded, then run the function
document.addEventListener('DOMContentLoaded', function() {
  requestData(); // heater window lightlevel
  
  var slider = document.getElementById("lightSlider").value;
  var output = document.getElementById("lightValue");
  output.innerHTML = slider;
});

// listen to changes in the lightSlider value and set to lightValue
document.getElementById("lightSlider").addEventListener("input", function() {
  document.getElementById("lightValue").innerHTML = this.value;
});


// listen to submit and send the new light level to the server
document.getElementById("setNewLight").addEventListener("click", function() {
  var value = document.getElementById("lightSlider").value;
  console.log("Light level sent to server: " + value);
  socket.emit("changeLightLevel", value);
});
