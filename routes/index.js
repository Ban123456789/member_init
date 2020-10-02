var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connection');
var firebase = require('../connections/firebase_connection');

router.get('/', function (req, res, next) {
    console.log(firebase.auth());

    firebaseDb.ref().once('value', function(content){
        console.log(content.val());
    });;

    res.render('index', {
        title: '六角學院留言板'
    });
});
/* GET home page. */
module.exports = router;