'use strict';

const express = require('express');
const authRouter = express.Router();


const { Doctor, Patient,Role,patient, doctor, Manager } = require('../models/index');
const basicauth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');

// this is for signup
authRouter.post('/signup', async (req, res, next) => {
    const userInfo = req.body;
    console.log(userInfo,'rolleee',userInfo.roleId);

    if (userInfo.roleId == 2  ) {
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
    } else if (userInfo.roleId == 1) {
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
    else if (userInfo.roleId == 3) {
        try {
            const managerRecord = await Manager.create(userInfo);
            const managerOutput = {
                manager: managerRecord,
                token: managerRecord.token
            }
            res.status(201).json(managerOutput);
        } catch (e) {
            next(e.message)
        }
    }
        

});

// this is for signin
authRouter.get('/signin', basicauth, async (req, res) => {
    const user =  req.user
        // capabilities:capability.capabilities
        // token: req.user.token
    
    res.status(200).json(user);
});

authRouter.get('/allpatients', async (req, res, next) => {
    const userRecords = await patient.findAll({});
    const list = userRecords.map(user =>{
        return (
            {
                user
            }
        )
     });
  

  

    res.status(200).json(list);
});
authRouter.get('/alldoctors', async (req, res, next) => {
    const userRecords = await doctor.findAll({});
    const list = userRecords.map(user =>{
        return (
            {
                user
            }
        )
     });

   

    res.status(200).json(list);
});


module.exports = authRouter;