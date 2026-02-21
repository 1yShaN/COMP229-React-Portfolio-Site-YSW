
let configDB = require('./config/mongodb');
let app = require('./config/express');
let http = require('http');

configDB().catch(console.dir);
var server = http.createServer(app);

server.on('listening', onListening);
server.listen(3000);

function onListening() {
    console.log('Server running at http://localhost:3000/');
}

function helloWorld(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!');
}

function goodbye(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Goodbye!');
}

function notfound(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page Not Found');
}

const temp = {
    name: 'John Smith',
    email: 'john@smith.ca'
}

app.get('/user/getuser', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    res.json(temp);
})

app.get('/hello', helloWorld);
app.get('/bye', goodbye);
app.use(notfound);

app.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000/');
})

