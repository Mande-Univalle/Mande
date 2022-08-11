var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');

/* GET home page.*/
router.get('/', function (req, res, next) {
  res.render('index', { error: '' });
});

//Iniciar sesión
router.post('/', function (req, res, next) {
  var celular = req.body.celular;
  var contrasena = req.body.contrasena;
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM usuario WHERE telefono_usuario='${celular}' AND contrasena = '${contrasena}';`,
      function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          return console.error('error running query', err);
        }

        if (result.rowCount == 0){
          //No hace nada
          res.render('index', { error: 'Datos incorrectos. Intente nuevamente.' });
        }else{  
          res.send(JSON.stringify(result.rows));
        }
      });
  });

})

module.exports = router;