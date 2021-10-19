'use strict';
const express = require('express');
const app = express();
app.use(express.json());
var socketio = require("socket.io");
const { v4: uuidV4 } = require("uuid");
const uuid = require('uuid').v4;// random uuid
const { db } = require("./models/index");
const cors = require('cors');
app.use(cors());
const notFoundHandler = require('./errors-handler/404');
const internalServerError = require('./errors-handler/500');
const medicalInfoRouter=require('./routes/patientMedical-implementation');
const userRouter = require('./routes/users-route');
const roleRouter = require('./routes/roles-route');
const InfoRouter = require('./routes/patientInfo-route');
const controlRouter = require('./routes/controlRout');
const bookroute = require('./routes/booking-route');
const departmentRoutes = require('./routes/department-routes');
const answerAndQuestion = require('./routes/ansAndQues-route');
const {messages} = require('./models/index');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/ChatPage", (req, res) => {
  // res.redirect(`/${uuidV4()}`)
  res.sendFile(__dirname + "/views/patient.html");
});
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
//chat functions
const PORT = process.env.PORT;
  let  server =  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketio(server);


io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on('online' , data=>{
    console.log(data , ' is online');
    
    socket.emit("onlineState" , data)
  } );
  socket.userName = "Anonymous";
////////
socket.on('join-room',async (roomId, userId) => {
  console.log(` ${userId} : join-room`);
  const responsemessages = await messages.findAll();
  let allmessages = responsemessages.map(messsage=>{
    return(
      messsage.dataValues
    )
  })

  io.sockets.emit("getallmessages", allmessages);

  socket.join(roomId)  // Join the room
  socket.broadcast.emit('user-connected', userId) // Tell everyone else in the room that we joined
  // Communicate the disconnection
  socket.on('disconnected', (userId) => {
    console.log(` ${userId} : disconnect`);

      socket.broadcast.emit('user-disconnected', userId)
  })
})
  socket.on("change_userName", (data) => {
    console.log(data.userName);
    socket.userName = data.userName;
  });
  let queueMassage = []
   
  
  //handle the new message event
  socket.on('new_message',async data => {
   
    let id = uuid()
    //add massge to queue 
    console.log("new message", data);
    
    const messageRecord = await messages.create(data);
    const response = await messages.findAll();
    let responsedata = response.map(messsage=>{
      return(
        messsage.dataValues
      )
    })
    console.log(messageRecord.dataValues);

    io.sockets.emit("receive_message", responsedata);

    // console.log('queue massage after save', queueMassage)
  });
  //get all massage from queue
  // socket.on('getAll', (myID) => {  //  my
  //   Object.keys(queueMassage.massage).forEach(id => {
  //     console.log(queueMassage.massage[id].id)  //  reciver
  //     if(queueMassage.massage[id].id == myID){
  //       socket.emit('newmssg', { id, massage: queueMassage.massage[id] });
  //     }
  //   })
  // });
  //delete massage from queue  after user recevied 
  socket.on('received', id => {
    delete queueMassage.massage[id];
    console.log('queue after del ', queueMassage.massage[id])
  });
  socket.on("change_userName", (data) => {
    socket.userName = data.userName;
  });
});
db.sync()
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch(console.error);
module.exports = {
    server: app,
    // start: port => {
    //   if (!port) { throw new Error('Missing Port'); }
    //   app.listen(port, () => console.log(`Listening on ${port}`));
    // },
  };
