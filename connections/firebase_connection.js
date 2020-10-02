var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCwodgYg3MmgaKdgu_gYyJPcvjbgeQ4o6Y",
    authDomain: "member-init.firebaseapp.com",
    databaseURL: "https://member-init.firebaseio.com",
    projectId: "member-init",
    storageBucket: "member-init.appspot.com",
    messagingSenderId: "630083011999",
    appId: "1:630083011999:web:ac64acf48dfbc21bcbe9aa",
    measurementId: "G-0MZ7V3JMK3"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  module.exports = firebase;