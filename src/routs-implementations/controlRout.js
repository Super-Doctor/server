'use strict';

const express = require('express');
const router = express.Router();

const uuid = require('uuid').v4;

const {  PatientMedicalInfo,PatientInfo,Patient,Doctor,PrescriptionInfo,Manager,manager } = require('../models/index');
const basicauth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');






//Presecription Routes

router.post('/addPresecription/:role',bearerAuth,permissions('create-prescription'),  async (req, res, next) => {
    let prescriptionInfo = req.body;
    try {
        const prescriptionRecord = await PrescriptionInfo.create(prescriptionInfo);
        const output = {
            prescriptionInformation: prescriptionRecord
        }
        res.status(201).json(output);
    } catch (e) {
        next(e.message)
    }
});
// router.get('/allmedicalinfos',bearerAuth,permissions('read-medicalinfo'), async (req, res, next) => {

router.get('/allpresecriptions', async (req, res, next) => {

    const prescriptionRecord = await PrescriptionInfo.get();
    const output = {
        prescriptionInformation: prescriptionRecord
    }
    res.status(201).json(output);
});
// router.get('/medicalinfos/:id/:role',bearerAuth,permissions('read'), async (req, res, next) => {

router.get('/presecriptioninfos/:id/:role', async (req, res, next) => {
    let id = req.params.id;  
    id=String(id);
    let prescriptionRecord = await PrescriptionInfo.get(id)  

    const allInfo={
        prescriptionInformation:prescriptionRecord,
    }
    
    res.status(200).json(allInfo);

});

router.delete('/deletepresecriptionInfo/:id/:role',bearerAuth, permissions('delete-presecription'), async (req, res, next) => {
    const infoId = Number(req.params.id)
    console.log(infoId);
    await PrescriptionInfo.delete(infoId)

    const prescriptionRecord = await PrescriptionInfo.get();
    const output = {
        prescriptionInformation: prescriptionRecord
    }
    res.status(201).json(output);
});


router.put('/updatepresecriptionInfo/:id/:role',bearerAuth, permissions('update-prescription'), async (req, res, next) => {
    const prescriptionInfo = req.body;
    const infoId = Number(req.params.id);


    const prescriptionRecord = await PrescriptionInfo.update(infoId,prescriptionInfo);
    const output = {
        prescriptionInformation: prescriptionRecord
    }
    res.status(201).json(output);
});







//managers routes
router.get('/allmanagers', async (req, res, next) => {

    const managersRecord = await Manager.get();
    const output = {
        managersInformation: managersRecord
    }
    res.status(201).json(output);
});

router.put('/updateDoctor/:id/:role',bearerAuth, permissions('update-doctor'), async (req, res, next) => {
    const doctorInfo = req.body;
    const infoId = req.params.id;


    const doctorRecord = await Doctor.update(infoId,doctorInfo);
    const output = {
        doctorInformation: doctorRecord
    }
    res.status(201).json(output);
});
router.put('/updatePatient/:id/:role',bearerAuth, permissions('update-patient'), async (req, res, next) => {
    const patientInfo = req.body;
    const infoId = req.params.id;


    const patientRecord = await Patient.update(infoId,patientInfo);
    const output = {
        patientInformation: patientRecord
    }
    res.status(201).json(output);
});

router.delete('/deleteDoctor/:id/:role',bearerAuth, permissions('delete-doctor'), async (req, res, next) => {
    const infoId = req.params.id
    console.log(infoId);
    await Doctor.delete(infoId)

    const doctorRecord = await Doctor.get();
    const output = {
        doctorInformation: doctorRecord
    }
    res.status(201).json(output);
});

router.delete('/deletePatient/:id/:role',bearerAuth, permissions('delete-patient'), async (req, res, next) => {
    const infoId = req.params.id
    console.log(infoId);
    await Patient.delete(infoId)

    const patientRecord = await Patient.get();
    const output = {
        patientInformation: patientRecord
    }
    res.status(201).json(output);
});


router.delete('/deleteManager/:id/:role',bearerAuth, permissions('delete-manager'), async (req, res, next) => {
    const infoId = req.params.id
    console.log(infoId);
    await Manager.delete(infoId)

    const managerRecord = await Manager.get();
    const output = {
        managerInformation: managerRecord
    }
    res.status(201).json(output);
});



module.exports = router;