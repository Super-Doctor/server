'use strict';

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { doctors } = require('../models/doctor-model');
const { patientInfos,PatientInfo } = require('../models/index')
const basicAuth = require('../middlewares/basic-auth')
const bearerAuth = require('../middlewares/bearer-auth')
const permissions = require('../middlewares/acl');


authRouter.post('/addInfo/:role',bearerAuth,permissions('create'), async (req, res, next) => {
  try {
    let infoRecord = await PatientInfo.create(req.body);
    const output = {
      PatientInfo: infoRecord,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});



authRouter.get('/info', async (req, res, next) => {
  const info = await patientInfos.findAll({});
 

  res.status(200).json(info);
});





module.exports = authRouter;