'use strict';

const express = require('express');
const authRouter = express.Router();


const { Doctor, Patient } = require('../models/index');
const basicauth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');

// this is for signup
authRouter.post('/signup/:role', async (req, res, next) => {
    const userInfo = req.body;
    console.log(userInfo);

    if (req.params.role == 'doctor') {
        try {
            const doctorRecord = await Doctor.create(userInfo);
            const doctorOutput = {
                doctor: doctorRecord,
                token: doctorRecord.token
            }
            res.status(201).json(doctorOutput);
        } catch (e) {
            next(e.message)
        }
    } else if (req.params.role == 'patient') {
        try {
            const patientRecord = await Patient.create(userInfo);
            const patientOutput = {
                patient: patientRecord,
                token: patientRecord.token
            }
            res.status(201).json(patientOutput);
        } catch (e) {
            next(e.message)
        }
    }

});

// this is for signin
authRouter.get('/signin', basicauth, (req, res) => {
    const user = {
        user: req.user,
        token: req.user.token
    }
    res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
    const userRecords = await User.findAll({});
    const list = userRecords.map(user => user.userName);
    res.status(200).json(list);
});


module.exports = authRouter;