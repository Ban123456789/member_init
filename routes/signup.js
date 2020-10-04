const { response } = require('express');
var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var firebaseDb = require('../connections/firebase_admin_connection');
var fireAuth = firebase.auth();

router.get('/', function (req, res) {
    res.render('signup', { title: '註冊', error: req.flash('errorMessage')});
})

router.post('/', function (req, res) {
    let email = req.body.email;
    let pass = req.body.passwd;
    let nickname = req.body.nickname;
    
        // todo 它是一個 promise
        fireAuth.createUserWithEmailAndPassword(email, pass)
        .then( response => {
            console.log(response);
            let saveUser = {
                'email': email,
                'nickName': nickname,
                'uid': response.user.uid
            };
                firebaseDb.ref('/user/' + response.user.uid).set(saveUser);
                res.redirect('/signup/success');
        }).catch( error => {
            let errMessage = '';
                if(error.message === 'The password must be 6 characters long or more.'){
                    errMessage = '密碼至少六個字元!!!'
                }else if(error.message === 'The email address is badly formatted.'){
                    errMessage = '請輸入有效郵件!!!';
                }else if(error.message === 'The email address is already in use by another account.'){
                    errMessage = '此郵件已註冊過摟!!!'
                };

                req.flash('errorMessage', errMessage);
                res.redirect('/signup');
        });
})
router.get('/success',function(req,res){
    res.render('success',{
        title:'註冊成功'
    });
})
module.exports = router;