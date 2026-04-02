var admin = require("firebase-admin");
require('dotnev').config()

var serviceAccount = JSON.parse(process.env.GCLOUD_SERVICE_KEY);

module.exports = async function (){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });     

    console.log("You successfully connected to Firebase!")                                                                                                              
};