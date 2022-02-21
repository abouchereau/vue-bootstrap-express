const server = require('websocket').server;
const http   = require('http');
const portSocket = 3617;



const socket = new server({httpServer: http.createServer().listen(portSocket, ()=>{})});
socket.on('error', (err)=>console.error("Error: " + err.message));
socket.on('request', (request) => {
    let connection = request.accept(null, request.origin);
    console.log("Socket connected through port " + portSocket);
    connection.on('message', (msg) => {
        //console.log("MEssage = ",message);
        let trucs = [
            {"name": "Yop", "age": 25},
            {"name": "Yip", "age": 52},
            {"name": "Yup", "age": 15},
            {"name": "Yap", "age": 1}
        ];
        connection.send(JSON.stringify(trucs));
    });
});
