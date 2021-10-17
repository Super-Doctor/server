'use strict';
const basicAuth = require('../middlewares/basic-auth')
const bearerAuth = require('../middlewares/bearer-auth')
const bcrypt = require('bcrypt');
const permissions = require('../middlewares/acl');
// const { doctors } = require('../models/doctor-model');
const express = require('express');
const authRouter = express.Router();

const  {Book, book}  = require('../models/index')


authRouter.post('/bookAppointment', async (req, res, next) => {
  try {
    let infoRecord = await Book.create(req.body);
    const output = {
        Book: infoRecord,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});



authRouter.get('/AllAppointments/:doctorId', async (req, res, next) => {
  const info = await book.findAll({where : {doctorId : req.params.doctorId}});
 

  res.status(200).json(info);
});




authRouter.delete('/deleteAppointments/:id/:role',bearerAuth, permissions('delete-Appointments'), async (req, res, next) => {
    const infoId = req.params.id;
    // console.log(infoId);
    await Book.delete(infoId)

    const AppointmentsRecord = await Book.get();
    const output = {
        AppointmentsInformation: AppointmentsRecord
    }
    res.status(201).json(output);
});


authRouter.put('/updateAppointments/:id/:role',bearerAuth, permissions('update-Appointments'), async (req, res, next) => {
    const BookInfo = req.body;
    const infoId =req.params.id;


    const AppointmentsRecord = await Book.update(infoId,BookInfo);
    const output = {
        AppointmentsInformation: AppointmentsRecord
    }
    res.status(201).json(output);
});

module.exports = authRouter;