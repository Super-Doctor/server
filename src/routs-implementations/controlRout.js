'use strict';

const express = require('express');
const router = express.Router();

const uuid = require('uuid').v4;

const {  PatientMedicalInfo,PatientInfo,Patient,Doctor,PrescriptionInfo } = require('../models/index');
const basicauth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');


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



module.exports = router;