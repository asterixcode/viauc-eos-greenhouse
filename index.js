// Establishing connection with server
var socket = io.connect(); /* global io */

// Changes the heater state
function changeHeaterState(state){
  if (state==1){
    // Emit message changing the state to ON
    socket.emit('changeHeaterState', '{"state":"on"}');
    // Change heater status on web page to ON
    document.getElementById("heaterStatus").innerHTML = "Status: ON";
  }
  else if (state==0){
    // Emit message changing the state to 0
    socket.emit('changeHeaterState', '{"state":"off"}');
    // Change heater status on web page to OFF
    document.getElementById("heaterStatus").innerHTML = "Status: OFF";
  }
}

function updateHeaterState(state) {
  if (state == "on") {
      document.getElementById("heaterState").innerHTML = "Open";
      document.getElementById("heaterInput").checked = true;
  } else if (state == "off") {
      document.getElementById("heaterState").innerHTML = "Closed";
      document.getElementById("heaterInput").checked = false;
  }
}


// Changes the window state
function changeWindowState(state){
  if (state==1){
  // Emit message changing the state to 1
        socket.emit('changeWindowState', '{"state":1}');
        // Change window status on web page to OPEN
        document.getElementById("outputWindowStatus").innerHTML = "Status: OPEN";
    }
    else if (state==0){
        // Emit message changing the state to 0
        socket.emit('changeWindowState', '{"state":0}');
        // Change window status on web page to CLOSED
        document.getElementById("outputWindowStatus").innerHTML = "Status: CLOSED";
    }
}

