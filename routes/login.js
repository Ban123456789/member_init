var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var firebaseDb = require('../connections/firebase_admin_connection');
var fireAuth = firebase.auth();


router.get('/', function (req, res) {
    res.render('login', { title: '登入', error: req.flash('err') });
})
router.post('/', function (req, res) {
    fireAuth.signInWithEmailAndPassword(req.body.email, req.body.passwd)
    .then( response => {
        console.log('登入成功');
    // todo 將它存到瀏覽器上(特性: 在同一個網域下，這組 session 都是有效的，並且資料是加密的)
        req.session.uid = response.user;
        console.log(req.session.uid.uid);
        res.redirect('/');
    }).catch( error => {
        let errorMessage = '';
            console.log(error);
            console.log('登入失敗');
            if(error.code === 'auth/wrong-password'){
                errorMessage = '請輸入正確密碼!!!';
            }else if(error.code === 'auth/user-not-found'){
                errorMessage = '此郵件尚未註冊!!!';
            };
            req.flash('err', errorMessage);
            res.redirect('/login');
        // The password is invalid or the user does not have a password.
        // There is no user record corresponding to this identifier. The user may have been deleted.
    });
})
module.exports = router;