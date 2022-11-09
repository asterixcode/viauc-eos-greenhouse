//Loading modules
var http = require('http')
var fs = require('fs')
var path = require('path')
var ip = require("ip")
var myip = ip.address()

// Initialize the server on port 5050
var server = http.createServer(function(req, res) {
    // requesting files
    var file = '.' + ((req.url == '/') ? '/index.html' : req.url);
    var fileExtension = path.extname(file);
    var contentType = 'text/html';

    // Uncoment if you want to add css to your web page
    // if (fileExtension == '.css') {
    //     contentType = 'text/css';
    // }
    
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

    // on disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected.')
    })
});
