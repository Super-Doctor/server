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

// authRouter.post('/signIn', basicAuth, (req, res, next) => {
//   const role = {
//     Role: req.Role,
//     token: req.Role.token
//   };
//   res.status(200).json(role);
// });

authRouter.get('/roles', async (req, res, next) => {
  const roles = await Role.get({});
  const list = roles.map(role => {
    return (
      role.role,
      role.capabilities
      )

  });

  res.status(200).json(list);
});
authRouter.get('/', async (req, res, next) => {
  res.status(200).send('server is working :) :)');
});




module.exports = authRouter;