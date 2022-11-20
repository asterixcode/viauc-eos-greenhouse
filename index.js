// Establishing connection with server
var socket = io.connect(); /* global io */

function getData() {
  socket.emit("getData", '{"state":"get"}');
}
// var clock = setInterval(getData, 5000); // Get data every five second

socket.on("getHeaterState", function(data) {
  // Update the web page
  if (data == 1) {
    document.getElementById("heaterStatus").innerHTML = "Status: ON";
  } else {
    document.getElementById("heaterStatus").innerHTML = "Status: OFF";
  }
});

socket.on("getWindowState", function (data) {
  console.log("***WINDOW**** = " + data);
  document.querySelector("#windowStatus").innerHTML = `Status: ${data.toUpperCase()}`;
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
  getData(); // Get data from server
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