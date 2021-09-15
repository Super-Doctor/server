'use strict';

const express = require('express');
const app = express();
app.use(express.json());

const errorHandler = require('./errors-handler/404');
const internalServerError = require('./errors-handler/500');
const medicalInfoRouter=require('./routes/patientMedical-implementation');
const userRouter = require('./routes/users-route');
const roleRouter = require('./routes/roles-route');
const InfoRouter = require('./routes/patientInfo-route');
const controlRouter = require('./routes/controlRout');
const bookroute = require('./routes/booking-route');
const departmentRoutes = require('./routes/department-routes');
const answerAndQuestion = require('./routes/ansAndQues-route')



app.get('/' , (req,res)=>{
    res.status(200).send('Every Thing Is Working Good... :)');
})

app.get('/home' , (req,res)=>{
  res.status(200).send('welcome');
})


app.get('/bad', badReq);

function badReq(req, res) {
  throw new Error('Something went wrong !!!!!');
}

app.use(roleRouter)
app.use(userRouter);
app.use(InfoRouter);
app.use(medicalInfoRouter);
app.use(controlRouter);
app.use(bookroute);
app.use(departmentRoutes)
app.use(answerAndQuestion)
app.use('*' , errorHandler);
app.use(internalServerError);


module.exports = {
    server: app,
    start: port => {
      if (!port) { throw new Error('Missing Port'); }
      app.listen(port, () => console.log(`Listening on ${port}`));
    },
  };
