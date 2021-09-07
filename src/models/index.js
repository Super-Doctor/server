'use strict';


require('dotenv').config();

const {Sequelize , DataTypes} = require('sequelize');

const patientModel = require('./patient-model');
const patientRecord=require('./patientInfoModel');
const doctorModel = require('./doctor-model');
const roleModel = require('./roles-model');

const collections=require('./library/collection');

const SQL_DATABASE_URL = process.env.SQL_DATABASE_URL || "postgres://gxvtzktj:Z0X7tmh-7pZEdTAwsG1Jd6_VmTXBZJtk@chunee.db.elephantsql.com/gxvtzktj";

const sequelize = new Sequelize (SQL_DATABASE_URL, {});

const patient = patientModel(sequelize , DataTypes);
const patientInfo=patientRecord(sequelize,DataTypes);
const doctor = doctorModel(sequelize, DataTypes);
const role = roleModel(sequelize, DataTypes);

// To create the relations
//relations between doctor and patients
doctor.hasMany(patient, { sourceKey: 'id', foreignKey: 'doctorId' });
patient.belongsTo(doctor, { foreignKey: 'doctorId', targetKey: 'id' });

//relations between roles with doctor and patients

role.hasMany(doctor, { sourceKey: 'id', foreignKey: 'roleId' });
role.hasMany(patient, { sourceKey: 'id', foreignKey: 'roleId' });
patient.belongsTo(role, { foreignKey: 'roleId', targetKey: 'id' });
doctor.belongsTo(role, { foreignKey: 'roleId', targetKey: 'id' });

//relations between patientInfo record and patients

patient.hasOne(patientInfo,{  foreignKey: 'pId' });
// patientInfo.belongsTo(patient,{  targetKey: 'id' });

const patientCollection=new collections(patient);
const doctorCollection=new collections(doctor);
const patientInfoCollection= new collections(patientInfo);



module.exports = {
    db : sequelize,
    Patient : patientCollection,
    PatientInfot:patientInfoCollection,
    Doctor : doctorCollection
}

