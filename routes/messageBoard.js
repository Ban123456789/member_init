var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connection');
var { check, validationResult } = require('express-validator');

let chain = [
    check('content').trim().isLength({min:1}).withMessage('留言訊息不得為空!'),
];

router.post('/', chain, function (req, res) {
    let resEro = validationResult(req);
        if(!resEro.isEmpty()){
            console.log(resEro);
            req.flash('error', resEro.errors[0].msg);
            res.redirect('/');
        }else{
            firebaseDb.ref(`user/${req.session.uid.uid}`).once('value', function(userData){
                const list = firebaseDb.ref('/list').push();
                let listContent = {
                    name: userData.val().nickName,
                    content: req.body.content
                };
                    list.set(listContent);
            });
        };
})
module.exports = router;