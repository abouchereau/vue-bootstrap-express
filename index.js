const express = require('express');
const app = express();
const port = 3615;
const portSocket = 3616;
const fs = require('fs');
const server = require('websocket').server;
const http   = require('http');

const getFiles = path => {
    const files = []
    for (const file of fs.readdirSync(path)) {
        const fullPath = path + '/' + file
        if(fs.lstatSync(fullPath).isDirectory())
            getFiles(fullPath).forEach(x => files.push(file + '/' + x))
        else files.push(file)
    }
    return files
}
//express.static.mime.define({'application/javascript;': ['vue']});
app.use(express.static('public'));

app.get('/', (req, res)=>res.sendFile(__dirname +'/public/index.html'));

//add dynamically all ressources for pkg
let publicPath = __dirname+'/public';
let files = getFiles(publicPath);
for(let file of files) {
    app.get("/"+file, (req, res) =>{
        res.sendFile(publicPath+"/"+file);
    });
}


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



app.listen(port, ()=>{
    console.log("Welcome to DJ Hero Midi - by Anthony Bouchereau - 2022");
    console.log("");
    console.log(`Now please open your favorite browser and go the URL : http://localhost:${port}`)
})




