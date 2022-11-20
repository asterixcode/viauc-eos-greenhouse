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
    
    socket.on('getData', getData);
    socket.on('changeHeaterState', handleChangeHeaterState);
    socket.on('changeWindowState', handleChangeWindowState);
    
    socket.on('disconnect', () => {
        console.log('User disconnected.')
    })
});

function getData() {
    console.log("Calling getData()...");
    // Get data from the sensors
    var heater = exec("./getHeaterState.sh")
    var window = exec("./getWindowState.sh")
    
    console.log("WINDOW = " + heater);
    var jsonHeater = heater.toString("utf8");
    var jsonWindow = window.toString("utf8");
    console.log("WINDOW JSON = " + jsonWindow);
    // Send data to the web page
    io.emit("getHeaterState", jsonHeater);
    io.emit("getWindowState", jsonWindow);
}

// Change heater state when a button is pressed v1
function handleChangeHeaterState(data) {
    var newData = JSON.parse(data);
    console.log("HEATER = " + newData.state);
    // turns the HEATER ON or OFF
    var change = exec("./setHeaterState.sh " + newData.state)
}

// Change window state when a button is pressed
function handleChangeWindowState(data) {
    var newData = JSON.parse(data);
    console.log("WINDOW = " + newData.state);
    var change = exec("./setWindowState.sh " + newData.state)
}





// Change heater state when a button is pressed v2
function handleChangeHeaterState(data) {
    if (data == 1) {
        console.log("HEATER v2 = ON");
        // turns the HEATER ON
        var on = exec("./setHeaterState.sh on")
    }
    else { // data == 0
        console.log("HEATER v2 = OFF");
        // turns the HEATER OFF
        var off = exec("./setHeaterState.sh off")
    }
    getHeater();
}
function getHeater() {
    const heater = exec("./getHeaterState.sh");
    const jsonHeater = heater.toString("utf8");
    io.emit("getHeaterState", jsonHeater);
}
