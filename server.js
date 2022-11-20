//Loading modules
var http = require('http')
var fs = require('fs')
var path = require('path')
var ip = require('ip')
var myip = ip.address()
const exec = require('child_process').execSync;

// Initialize the server on port 5050
var server = http.createServer(function(req, res) {
    // requesting files
    var file = '.' + ((req.url == '/') ? '/index.html' : req.url);
    var fileExtension = path.extname(file);
    var contentType = 'text/html';

    // add css to your web page
    if (fileExtension == '.css') {
        contentType = 'text/css';
    }
    
    fs.exists(file, function(exists) {
        if (exists) {
            fs.readFile(file, function(error, content) {
                if (!error) {
                    // Page found, write content
                    res.writeHead(200, { 'content-type': contentType });
                    res.end(content);
                }
            });
        }
        else {
            // Page not found
            res.writeHead(404);
            res.end('Page not found');
        }
    })
}).listen(5050)
console.log('Server running at http://'+myip+':5050/')



// TODO: Export the server and add below code into another file (manager.js)
// Loading socket io module.
var io = require('socket.io')(server);

// When communication is established
io.on('connection', function (socket) {
    console.log("A user has connected...")
    
    socket.on("requestData", readData);
    socket.on('changeHeaterState', handleChangeHeaterState);
    socket.on('changeWindowState', handleChangeWindowState);
    socket.on("changeLightLevel", handleChangeLightLevel);
    
    socket.on('disconnect', () => {
        console.log('User disconnected.')
    })
});

function getHeaterState() {
    try {
        const heater = exec("./getHeaterState.sh");
        const jsonHeater = heater.toString("utf8");
        io.emit("getHeaterState", jsonHeater);
    } catch (error) {
        console.log(error);
    }
}

function getWindowState() {
    try {
        const window = exec("./getWindowState.sh");
        const jsonWindow = window.toString("utf8");
        io.emit("getWindowState", jsonWindow);   
    } catch (error) {
        console.log(error);
    }
}

function getLightLevel() {
    try {
        const light = exec("sudo ./getLightLevel.sh");
        const jsonLight = light.toString("utf8");
        io.emit("getLightLevel", jsonLight);
    } catch (error) {
        console.log(error);
    }
} 

// function getDaylight() {
//   try {
//     const daylight = exec("./getDaylight.sh");
//     const jsonDaylight = daylight.toString("utf8");
//     io.emit("getDaylight", jsonDaylight);
//   } catch (error) {
//     console.log(error);
//   }
// }

function readData() {
  console.log("Calling readData()...");
  // Get data from the sensors
  const heater = getHeaterState();
  const window = getWindowState();
  const light = getLightLevel();

  const data = { heater, window, light };
  io.emit("currentData", data);
}

// Change heater state when a button is pressed
function handleChangeHeaterState(data) {
    try {
        if (data == 1) {
            console.log("HEATER v2 = ON");
            // turns the HEATER ON
            exec("./setHeaterState.sh on")
        }
        else { // data == 0
            console.log("HEATER v2 = OFF");
            // turns the HEATER OFF
            exec("./setHeaterState.sh off")
        }
        getHeaterState();
    } catch (error) {
        console.log(error);
    }
}

// Change window state when a button is pressed
function handleChangeWindowState(data) {
    try {
        const newData = JSON.parse(data);
        exec("./setWindowState.sh " + newData.state);
        getWindowState();
    } catch (error) {
        console.log(error);
    }
}

// Change light state when a button is pressed
function handleChangeLightLevel(data) {
    try {
        exec("sudo ./setLightLevel.sh " + data);
        getLightLevel();
    } catch (error) {
        console.log(error);
    }
}