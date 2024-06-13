const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let respuestasPendientes = [];

const notificaciones = [
    {id: 1, cuerpo: "tienes una nueva notificacion"},
    {id: 2, cuerpo: "Migue comento tu notificacion"}
  ];

  app.get('/notificaciones', (req, res) => {
  
    res.status(200).json({
      sucess: true,
      notificaciones
    });
  });

  app.get('/notificaciones-nuevas', (req, res) => {
   respuestasPendientes.push(res);
  });

  app.post('/notificaciones', (req, res) => {

    const idNotificacion = notificaciones.length > 0 ?
    notificaciones[notificaciones.length -1].id + 1 : 1;
  
    const notificacion = {
      id: idNotificacion,
      cuerpo: req.body.cuerpo
    };
  
    notificaciones.push(notificacion);
    responderCliente(notificacion);
  
    res.status(201).json({
      suces:true,
      message: "Notificacion creada."
    });
  });

  function responderCliente(notificacion) {
    for (let res of respuestasPendientes) {
        res.status(200).json({
            sucess: true,
            notificacion
        });
    }

    respuestasPendientes = [];
  }

  app.listen(3000, () => console.log('server starter on port 3000'));