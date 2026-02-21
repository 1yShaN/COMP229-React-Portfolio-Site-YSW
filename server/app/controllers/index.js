module.exports.hello = function (req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send('Welcome to My Portfolio Backend API.');
}