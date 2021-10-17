'use strict';

const express = require('express');
const router = express.Router();

const uuid = require('uuid').v4;

const {  PatientMedicalInfo,PatientInfo,Patient,Doctor,patientMedicalInfos } = require('../models/index');
const basicauth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');


router.post('/addMedicalInfo/:role',bearerAuth,permissions('read-medicalinfo'),  async (req, res, next) => {
    let medicalInfo = req.body;
    try {
        const medicalRecord = await PatientMedicalInfo.create(medicalInfo);
        const output = {
            medicalInformation: medicalRecord
        }
        res.status(201).json(output);
    } catch (e) {
        next(e.message)
    }
});
// router.get('/allmedicalinfos',bearerAuth,permissions('read-medicalinfo'), async (req, res, next) => {

router.get('/allmedicalinfos', async (req, res, next) => {

    const medicalRecord = await PatientMedicalInfo.get();
    const output = {
        medicalInformation: medicalRecord
    }
    res.status(201).json(output);
});
// router.get('/medicalinfos/:id',bearerAuth,permissions('read'), async (req, res, next) => {

router.get('/doctorPatients/:id', async (req, res, next) => {
    
    let medicalRecord = await patientMedicalInfos.findAll() ;
    let doctorPatients = medicalRecord.filter(recrod=>{
        if (recrod.doctorId=  req.params.id ) return true;
    })


  
    
    res.status(200).json(doctorPatients);

});

router.get('/patientRecords/:id', async (req, res, next) => {
    let patientInfo = await Patient.get(req.params.id);
    let patient = {
        userName : patientInfo.userName,
        gender : patientInfo.gender
    }
   
    let medicalRecord = await patientMedicalInfos.findAll() ;

    let patientRecords = medicalRecord.filter(recrod=>{
        if (recrod.patientId=  req.params.id ) return true;
    })

    let info = {
        patientInfo :patient,
        patientRecords : patientRecords
    }

    res.status(200).json(info);

});

router.delete('/deleteMedicalInfo/:id/:role',bearerAuth, permissions('delete-medicalRecord'), async (req, res, next) => {
    const infoId = Number(req.params.id)
    // console.log(infoId);
    await PatientMedicalInfo.delete(infoId)

    const medicalRecord = await PatientMedicalInfo.get();
    const output = {
        medicalInformation: medicalRecord
    }
    res.status(201).json(output);
});


router.put('/updateMedicalInfo/:id/:role',bearerAuth, permissions('update-medicalRecord'), async (req, res, next) => {
    const medicalInfo = req.body;
    const infoId = Number(req.params.id);


    const medicalRecord = await PatientMedicalInfo.update(infoId,medicalInfo);
    const output = {
        medicalInformation: medicalRecord
    }
    res.status(201).json(output);
});



module.exports = router;