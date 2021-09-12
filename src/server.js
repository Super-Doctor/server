'use strict';

const express = require('express');
const app = express();
app.use(express.json());

const notFoundHandler = require('./errors-handler/404');
const internalServerError = require('./errors-handler/500');
const medicalInfoRouter=require('./routs-implementations/patientMedical-implementation');
const userRouter = require('./routes/users-route');
const roleRouter = require('./routes/roles-route');
const InfoRouter = require('./routes/patientInfo-route');
const controlRouter = require('./routs-implementations/controlRout');




app.get('/' , (req,res)=>{
    res.status(200).send('Every Thing Is Working Good... :)');
})
app.use(roleRouter)
app.use(userRouter);
app.use(InfoRouter);
app.use(medicalInfoRouter);
app.use(controlRouter);

app.use('*' , notFoundHandler);
app.use(internalServerError);


module.exports = {
    server: app,
    start: port => {
      if (!port) { throw new Error('Missing Port'); }
      app.listen(port, () => console.log(`Listening on ${port}`));
    },
  };
