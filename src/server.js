'use strict';

const express = require('express');
const app = express();
app.use(express.json());
////////////////////


// var express = require('express')
//   , http = require('http');
// //make sure you keep this order
// var app = express();
// var server = http.createServer(app);
// app.use(express.json());
// var io = require('socket.io').listen(server);

//... 

// server.listen(8000);
///////////////////////
// const express = require('express');
// const app = express();

///////////////////////
// let server = require('http').Server(app);
// let stream = require('./socket/stream');

// const io = require('socket.io')(server, {
//   cors: { origin: '*' },
// });
// let path = require('path');
// let favicon = require('serve-favicon');

// const cors = require('cors');






// // app.use(favicon(path.join(__dirname, 'favicon-32x32.png')));
// app.use(express.static(path.join(__dirname+'/public')));


// app.set("view engine", "ejs");
// app.use(express.static("public"));
// // app.use("/peerjs", peerServer);
// app.get("/", (req, rsp) => {
//   rsp.redirect(`/${uuidv4()}`);
// });
// app.get("/:room", (req, res) => {
//   res.render("room", { roomId: req.params.room });
// });
// // app.use(express.static('public'));
// app.use(cors());

// io.of('/stream').on('connection', stream);

///////////////


const notFoundHandler = require('./errors-handler/404');
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
app.use(roleRouter)
app.use(userRouter);
app.use(InfoRouter);
app.use(medicalInfoRouter);
app.use(controlRouter);
app.use(bookroute);
app.use(departmentRoutes)
app.use(answerAndQuestion)
app.use('*' , notFoundHandler);
app.use(internalServerError);


module.exports = {
    server: app,
    start: port => {
      if (!port) { throw new Error('Missing Port'); }
      app.listen(port, () => console.log(`Listening on ${port}`));
    },
  };
