// Establishing connection with server
var socket = io.connect(); /* global io */

function requestData() {
  socket.emit("requestData", '{"state":"get"}');
}
// var clock = setInterval(requestData, 5000); // Get data every five second

socket.on("getHeaterState", function(data) {
  // Update the web page
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
//   var slider = document.getElementById("lightSlider");
//   var output = document.getElementById("lightValue");

//   // output.innerHTML = slider.value;

//   output.onchange = function() {
//     slider.value = this.value;
//   }
//   output.innerHTML = data;

//   // slider.oninput = function() {
//   //   output.innerHTML = this.value;
//   // }
// });

socket.on("currentData", function (data) {
  console.log(data);
});

// Changes the heater state
function changeHeaterState(state) {
    socket.emit("changeHeaterState", state);
}

// Changes the window state
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


// send the light level to the server
document.getElementById("setNewLight").addEventListener("click", function() {
  var value = document.getElementById("lightSlider").value;
  console.log("Light level sent to server: " + value);
  socket.emit("changeLightLevel", value);
});


// wait until the DOM is loaded, then run the function
// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('button').forEach(function(button) {
//     button.onclick = function() {
//       console.log(button.id);
//       switch (button.id) {
//         case 'heaterOn':
//           changeHeaterState(1);
//           break;
//         case 'heaterOff':
//           changeHeaterState(0);
//           break;
//         case 'windowOpen':
//           changeWindowState(1);
//           break;
//         case 'windowClose':
//           changeWindowState(0);
//           break;
//         default:
//           console.log('Error');
//       }
//     };
//   }
// )});

// // // wait until the DOM is loaded, then run the function
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('button').forEach(button => {
//     button.onchange = () => {
//       console.log(button.id);
//       switch (button.id) {
//         case 'heaterOn':
//           changeHeaterState(1);
//           break;
//         case 'heaterOff':
//           changeHeaterState(0);
//           break;
//         case 'windowOpen':
//           changeWindowState(1);
//           break;
//         case 'windowClose':
//           changeWindowState(0);
//           break;
//         default:
//           console.log('Error');
//       }
//     }
//   });
// });