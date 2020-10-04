var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connection');

router.post('/', function (req, res) {
    firebaseDb.ref(`user/${req.session.uid.uid}`).once('value', function(userData){
        const list = firebaseDb.ref('/list').push();
        let listContent = {
            name: userData.val().nickName,
            content: req.body.content
        };
            list.set(listContent);
    });
})
module.exports = router;