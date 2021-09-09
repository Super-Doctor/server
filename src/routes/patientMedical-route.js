'use strict';

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { doctors } = require('../models/doctor-model');
const { patientMedicalInfos } = require('../models/index')
const basicAuth = require('../middlewares/basic-auth')
const bearerAuth = require('../middlewares/bearer-auth')

authRouter.post('/addMedicalInfo', async (req, res, next) => {
  try {
    let infoRecord = await patientMedicalInfos.create(req.body);
    const output = {
        patientMedicalInfos: infoRecord,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});



authRouter.get('/medicalInfo', async (req, res, next) => {
  const info = await patientMedicalInfos.findAll({});
 

  res.status(200).json(info);
});





module.exports = authRouter;