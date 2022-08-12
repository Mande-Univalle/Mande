var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('registro_usuario', { title: 'Express' });
});

//Iniciar sesión
router.post('/', function (req, res, next) {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var celular = req.body.celular;
  var direccion = req.body.direccion;
  var cedula = req.body.cedula;
  var correo = req.body.correo;
  var foto_recibo = req.body.foto_recibo;
  var tarjeta = req.body.tarjeta;
  var tipo = req.body.tipo;
  var contrasena = req.body.contrasena;

  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`INSERT INTO usuario VALUES('${celular}','${nombre}','${apellido}','${contrasena}', ${tipo}, 
    '${cedula}','${correo}','${direccion}','${foto_recibo}','${tarjeta}');`,
      function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          res.render('registro_usuario', { error: 'No fue posible registrar. Intente nuevamente.' });
          return console.error('error running query', err);
        }
   
        res.render('index', { error: 'Registro exitoso. Bienvenido a Mande.' });

      });
  });

});

module.exports = router;