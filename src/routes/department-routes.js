'use strict';
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('../middlewares/basic-auth')
const bearerAuth = require('../middlewares/bearer-auth')
const permissions = require('../middlewares/acl');
const {Department , department} = require('../models/index');


authRouter.post('/addDepartment', async (req, res , next )=>{
    try {

        const newDepartment =  await Department.create(req.body);
        res.status(201).json(newDepartment)

    } catch (e) {
       next (e.message)
    }


})




module.exports = authRouter;