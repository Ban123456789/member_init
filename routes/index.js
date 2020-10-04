var express = require('express');
const { validationResult, check } = require('express-validator');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connection');
var firebase = require('../connections/firebase_connection');


router.get('/', function (req, res) {
    let auth = req.session.uid;
    let listContent = [];
    
        firebaseDb.ref('list').once('value', function(listCon){
            listContent = listCon.val();
            res.render('index', {
                title: '六角學院留言板',
                auth: auth,
                list: listContent,
                error: req.flash('error'),
            });
        });
});
/* GET home page. */
module.exports = router;