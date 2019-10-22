const admin = require('firebase-admin')
const bcrypt = require('bcrypt')
const express = require('express')
const cors = require('cors')
const router = express.Router()

const db = admin.firestore()

router.use(express.json())
router.use(cors(origin=true))

router.post('/signIn', (req, res) => {
  db.collection('users').where('email', '==', req.body.email).get()
    .then(snapshot => {
      if(snapshot.empty) {
        res.sendStatus(401)
      } else if (snapshot.size != 1) {
        res.sendStatus(500)
      } else {
        const doc = snapshot.docs[0]
        const data = doc.data()

        bcrypt.compare(req.body.password, data.password).then(result => {
          if(result == true) {
            res.json({
              id: doc.id,
              email: data.email
            })
          } else {
            res.sendStatus(401)
          }
        })
      }
    })
    .catch(error => {
      console.log('error:', error)
      res.sendStatus(500)
    })
})

exports.router = router
