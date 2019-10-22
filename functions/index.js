const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express')

admin.initializeApp(functions.config().firebase);

exports.auth = functions.https.onRequest(express().use('/api/auth', require('./auth').router))
