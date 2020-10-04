var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connection');
var firebase = require('firebase');


router.get('/', function (req, res) {
    firebaseDb.ref(`user/${req.session.uid.uid}`).once('value', function(snapshot){
        res.render('user', { title: '會員專區', name: snapshot.val().nickName });
        console.log('item: ' + snapshot.val());
    });
})
module.exports = router; 