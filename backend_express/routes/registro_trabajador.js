var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('registro_trabajador', { title: 'Express' });
});

//Iniciar sesión
router.post('/', function (req, res, next) {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var celular = req.body.celular;
  var direccion = req.body.direccion;
  var cedula = req.body.cedula;
  var correo = req.body.correo;
  var foto_cedula = req.body.foto_cedula;
  var foto_rostro = req.body.foto_rostro;
  var labor = req.body.labor;
  var contrasena = req.body.contrasena;

  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query

    client.query(`INSERT INTO trabajador VALUES('${cedula}','${nombre}', '${apellido}','${contrasena}', 5, default,
    '${direccion}','${celular}','${correo}','${foto_cedula}', '${foto_rostro}');`,
      function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          res.render('registro_trabajador', { error: 'No fue posible registrar. Intente nuevamente.' });
          return console.error('error running query', err);
        }

        client.query(`INSERT INTO desempegna VALUES('${cedula}', ${labor}, 50000, '');`
        );
        
        res.render('index', { error: 'Registro exitoso. Bienvenido a Mande.' });

      });
  });

});

module.exports = router;