'use strict';

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { doctors } = require('../models/doctor-model');
const { Role } = require('../models/index')
const basicAuth = require('../middlewares/basic-auth')
const bearerAuth = require('../middlewares/bearer-auth')

authRouter.post('/addRole', async (req, res, next) => {
  try {
    let roleRecord = await Role.create(req.body);
    const output = {
      Role: roleRecord,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});



authRouter.get('/roles', async (req, res, next) => {
  const roles = await Role.findAll({});
 

  res.status(200).json(roles);
});
authRouter.get('/', async (req, res, next) => {
  res.status(200).send('server is working :) :)');
});




module.exports = authRouter;