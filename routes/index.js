var express = require('express')
var admin = require('firebase-admin')
var serviceAccount = require('./FireMonitor-d61080208394.json')
var router = express.Router()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://firemonitor-474e5.firebaseio.com'
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

router.post('/reportarIncendio', function (req, res, next) {
  admin.database().ref('mapas/1').set(
    {
      sender: req.body.id,
      timestamp: null,
      lat: req.body.lat,
      lng: req.body.lng,
      incendio: req.body.incendio
    }
  )
  res.status(200).json({})
})

module.exports = router
