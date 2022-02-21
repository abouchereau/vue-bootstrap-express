const express = require('express');
const app = express();
const port = 3615;
const portSocket = 3616;
const fs = require('fs');
const server = require('websocket').server;
const http   = require('http');
const childProcess = require('child_process');
const packageJson = require('./package.json');

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


let child = childProcess.fork(__dirname + "/src/child.js");

app.listen(port, ()=>{
    console.log("Welcome to "+packageJson.name+" - by Anthony Bouchereau - 2022");
    console.log("");
    console.log(`Now please open your favorite browser and go the URL : http://localhost:${port}`)
})




