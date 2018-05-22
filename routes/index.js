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
  console.log(req.body.mensaje);
  let mensaje = req.body.mensaje;
  let resultado = mensaje.split(";");
  console.log(
    {
      sender: resultado[0],
      timestamp: null,
      lat: resultado[1],
      lng: resultado[2],
      incendio: resultado[3]
    }
  );
  admin.database().ref('mapas/'+resultado[0]).set(
    {
      sender: resultado[0],
      timestamp: null,
      lat: resultado[1],
      lng: resultado[2],
      incendio: resultado[3]
    }
  )
  res.status(200).json({})
})

module.exports = router
