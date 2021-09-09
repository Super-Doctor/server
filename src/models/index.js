'use strict';


require('dotenv').config();

const {Sequelize , DataTypes} = require('sequelize');

const patientModel = require('./patient-model');
const patientRecord = require('./patientInfoModel');
const patientMedicalRecord = require('./patientMedical');
const doctorModel = require('./doctor-model');
const roleModel = require('./roles-model');
const presecriptionModel=require('../models/presecriptionModel');

const collections=require('./library/collection');

const SQL_DATABASE_URL = process.env.SQL_DATABASE_URL || "postgres://postgres@localhost:5432/HospitalProj"

// postgres://vujdqmsr:l1rg86zG064FLumpdEWpOHSKwHV5Yvp8@chunee.db.elephantsql.com/vujdqmsr
// "postgres://gxvtzktj:Z0X7tmh-7pZEdTAwsG1Jd6_VmTXBZJtk@chunee.db.elephantsql.com/gxvtzktj";
// postgres://postgres@localhost:5432/hospital


const sequelize = new Sequelize (SQL_DATABASE_URL, {});

const patient = patientModel(sequelize , DataTypes);
const patientInfo = patientRecord(sequelize,DataTypes);
const patientMedicalInfo = patientMedicalRecord(sequelize,DataTypes);
const doctor = doctorModel(sequelize, DataTypes);
const role = roleModel(sequelize, DataTypes);
const prescription=presecriptionModel(sequelize, DataTypes);

// To create the relations
//relations between doctor and patients
doctor.hasMany(patient, { sourceKey: 'id', foreignKey: 'doctorId' });
patient.belongsTo(doctor, { foreignKey: 'doctorId', targetKey: 'id' });

doctor.hasMany(prescription, { sourceKey: 'id', foreignKey: 'doctorId' });
prescription.belongsTo(doctor, { foreignKey: 'doctorId', targetKey: 'id' });

//relations between roles with doctor and patients

role.hasMany(doctor, { sourceKey: 'id', foreignKey: 'roleId' });
role.hasMany(patient, { sourceKey: 'id', foreignKey: 'roleId' });
patient.belongsTo(role, { foreignKey: 'roleId', targetKey: 'id' });
doctor.belongsTo(role, { foreignKey: 'roleId', targetKey: 'id' });

//relations between (patientInfo & patientMedicalInfo) and patients

patient.hasOne(patientInfo,{  foreignKey: 'patientId' });

patient.hasMany(patientMedicalInfo , {sourceKey: 'id', foreignKey: 'patientId' });
patientMedicalInfo.belongsTo(patient , { foreignKey: 'patientId', targetKey: 'id'});


const patientCollection = new collections(patient);
const doctorCollection = new collections(doctor);
const patientInfoCollection = new collections(patientInfo);
const patientMedicalCollection = new collections(patientMedicalInfo);
const roleCollection = new collections(role);
const prescriptionCollection=new collections(prescription);



module.exports = {
    db : sequelize,
    patient:patient,
    doctor:doctor,
    Patient : patientCollection,
    PatientInfo:patientInfoCollection,
    patientInfos:patientInfo,
    PatientMedicalInfo : patientMedicalCollection,
    PrescriptionInfo:prescriptionCollection,
    prescriptioninfo:prescription,
    patientMedicalInfos:patientMedicalInfo,
    Doctor : doctorCollection,
    Role : role
}

