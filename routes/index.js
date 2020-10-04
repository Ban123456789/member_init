var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connection');
var firebase = require('../connections/firebase_connection');

router.get('/', function (req, res, next) {
    let auth = req.session.uid;
    let listContent = [];
        firebaseDb.ref('list').once('value', function(listCon){
            listContent = listCon.val()
            // console.log(listContent);
            // for(var i in listContent){
            //     console.log(listContent[i]);
            // }
            res.render('index', {
                title: '六角學院留言板',
                auth: auth,
                list: listContent
            });
        });     
});
/* GET home page. */
module.exports = router;