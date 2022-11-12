//Loading modules
var http = require('http')
var fs = require('fs')
var path = require('path')
var ip = require("ip")
var myip = ip.address()
var bonescript = require('bonescript')
// var manager = require('./manager.js')

const exec = require('child_process').execSync;


// Create a variable called led, which refers to P9_14
var led = "USR0";
// Initialize the led as an OUTPUT
bonescript.pinMode(led, bonescript.OUTPUT);

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




// Loading socket io module.
var io = require('socket.io')(server);

// When communication is established
io.on('connection', function (socket) {
    // on connection
    console.log("A user has connected...")

    socket.on('changeHeaterState', handleChangeHeaterState);
    socket.on('changeWindowState', handleChangeWindowState);

    // socket.on('updateHeaterState', updateHeaterState);

    // on disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected.')
    })
});

// Change heater state when a button is pressed
function handleChangeHeaterState(data) {
    var newData = JSON.parse(data);
    console.log("HEATER = " + newData.state);
    // turns the HEATER ON or OFF
    var result = exec("sudo ./toggleHeater " + newData.state)
    
    // manager.handleHeater(newData.state);
    // bonescript.digitalWrite(led, newData.state);
}

// Change window state when a button is pressed
function handleChangeWindowState(data) {
    var newData = JSON.parse(data);
    console.log("WINDOW = " + newData.state);
    // open or close the window
    bonescript.digitalWrite(led, newData.state);
}

