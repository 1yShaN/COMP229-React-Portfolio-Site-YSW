let firebase = require('firebase-admin');

module.exports = async function (req, res, next){

}

module.exports.logToken = async function (req, res, next){
    console.log(req.headers);
    next();
}

module.exports.createUser = async function (req, res, next){
    try{
        let user = req.body;
    } catch (error){

    }
}