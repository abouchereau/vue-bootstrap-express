const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

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

app.use(express.static('public'));

app.get('/', (req, res)=>res.sendFile(__dirname +'/public/index.html'));

//add dynamically all ressources for pkg
let publicPath = __dirname+'/public';
let files = getFiles(publicPath);
for(let file of files) {
    app.get("/"+file, (req, res) =>res.sendFile(publicPath+"/"+file));
}

app.listen(port, ()=>console.log(`Open your favorite browser and go the URL : http://localhost:${port}`))


