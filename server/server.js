
let configDB = require('./config/mongodb');
// let firebase = require('./config/firebase');
let app = require('./config/express');
const PORT = process.env.PORT || 5000;

configDB().catch(console.dir);
// firebase();

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

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/`);
})

