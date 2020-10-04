var admin = require("firebase-admin");

var serviceAccount = require("../member-init-firebase-adminsdk-7srdz-2b72503b8d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://member-init.firebaseio.com"
});


var db = admin.database();

module.exports = db;