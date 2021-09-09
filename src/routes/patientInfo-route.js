'use strict';

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { doctors } = require('../models/doctor-model');
const { patientInfos } = require('../models/index')
const basicAuth = require('../middlewares/basic-auth')
const bearerAuth = require('../middlewares/bearer-auth')

authRouter.post('/addInfo', async (req, res, next) => {
  try {
    let infoRecord = await patientInfos.create(req.body);
    const output = {
        patientInfos: infoRecord,
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