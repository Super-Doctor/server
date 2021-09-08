'use strict';

const express = require('express');
const authRouter = express.Router();
const bcrypt=require('bcrypt');
const { doctors } = require('../models/doctor-model');
const {Role} = require('../models/index')
const basicAuth = require('../middlewares/basic-auth')
const bearerAuth = require('../middlewares/bearer-auth')

authRouter.post('/signUp', async (req, res, next) => {
  try {
    let roleRecord = await Role.create(req.body);
    const output = {
        Role: roleRecord,
      token: roleRecord.token
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signIn', basicAuth, (req, res, next) => {
  const role = {
    Role: req.Role,
    token: req.Role.token
  };
  res.status(200).json(role);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const user = await users.findAll({});
  const list = user.map(user => user.username);
  res.status(200).json(list);
});
authRouter.get('/', async (req, res, next) => {
  res.status(200).send('server is working :) :)');
});




module.exports = authRouter;