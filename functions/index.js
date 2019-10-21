const functions = require('firebase-functions');
const express = require('express')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.send("Hello from Firebase!");
});


exports.auth = functions.https.onRequest(express().use('/api/auth', require('./auth').router))
