const server = require('websocket').server;
const http   = require('http');
const Const = require("./../public/js/Const");


const socket = new server({httpServer: http.createServer().listen(Const.SOCKET_PORT, ()=>{})});
socket.on('error', (err)=>console.error("Error: " + err.message));
socket.on('request', (request) => {
    let connection = request.accept(null, request.origin);
    console.log("Socket connected through port " + Const.SOCKET_PORT);
    connection.on('message', (msg) => {
        let trucs = [
            {"name": "Yop", "age": 25},
            {"name": "Yip", "age": 52},
            {"name": "Yup", "age": 15},
            {"name": "Yap", "age": 1}
        ];
        connection.send(JSON.stringify(trucs));
    });
});
