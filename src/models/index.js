'use strict';


require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const patientModel = require('./patient-model');
const patientRecord = require('./patientInfoModel');
const patientMedicalRecord = require('./patientMedical');
const doctorModel = require('./doctor-model');
const managerModel = require('./managerModel');
const roleModel = require('./roles-model');

const presecriptionModel=require('../models/presecriptionModel');
const departmentModel = require('./departmentModel')
const bookingsModel = require('./booking-model')

const anwsersModel = require('./answersModel');
const questionModel = require('./questionsModel');

const collections = require('./library/collection');

const SQL_DATABASE_URL = process.env.SQL_DATABASE_URL || "postgres://postgres@localhost:5432/HospitalProj"


// postgres://vujdqmsr:l1rg86zG064FLumpdEWpOHSKwHV5Yvp8@chunee.db.elephantsql.com/vujdqmsr
// "postgres://gxvtzktj:Z0X7tmh-7pZEdTAwsG1Jd6_VmTXBZJtk@chunee.db.elephantsql.com/gxvtzktj";
// postgres://postgres@localhost:5432/hospital


const sequelize = new Sequelize(SQL_DATABASE_URL, {});

const patient = patientModel(sequelize, DataTypes);
const patientInfo = patientRecord(sequelize, DataTypes);
const patientMedicalInfo = patientMedicalRecord(sequelize, DataTypes);
const doctor = doctorModel(sequelize, DataTypes);
const manager = managerModel(sequelize, DataTypes);
const role = roleModel(sequelize, DataTypes);
const prescription = presecriptionModel(sequelize, DataTypes);
const questions = questionModel(sequelize, DataTypes);
const answers = anwsersModel(sequelize, DataTypes);

const department = departmentModel(sequelize,DataTypes);

const book=bookingsModel(sequelize, DataTypes);

// To create the relations
// relations between department and doctor and patient
department.hasMany(doctor,{sourceKey: 'id', foreignKey: 'departmentId'});  //  departmentId ==> doctor model
doctor.belongsTo(department, { foreignKey: 'departmentId', targetKey: 'id' });

department.hasMany(patientMedicalInfo, { sourceKey: 'id', foreignKey: 'departmentId' });  //  departmentId ==> patient medical model
patientMedicalInfo.belongsTo(department, { foreignKey: 'departmentId', targetKey: 'id' });

//relations between doctor and patients
// doctor.hasMany(patient, { sourceKey: 'id', foreignKey: 'doctorId' });
// patient.belongsTo(doctor, { foreignKey: 'doctorId', targetKey: 'id' });

doctor.hasMany(prescription, { sourceKey: 'id', foreignKey: 'doctorId' });
prescription.belongsTo(doctor, { foreignKey: 'doctorId', targetKey: 'id' });

//relations between roles with doctor and patients

role.hasMany(doctor, { sourceKey: 'id', foreignKey: 'roleId' });
role.hasMany(patient, { sourceKey: 'id', foreignKey: 'roleId' });
patient.belongsTo(role, { foreignKey: 'roleId', targetKey: 'id' });
doctor.belongsTo(role, { foreignKey: 'roleId', targetKey: 'id' });

//relations between (patientInfo & patientMedicalInfo) and patients

patient.hasOne(patientInfo, { foreignKey: 'patientId' });

patient.hasMany(patientMedicalInfo, { sourceKey: 'id', foreignKey: 'patientId' });
patientMedicalInfo.belongsTo(patient, { foreignKey: 'patientId', targetKey: 'id' });

// Questions and Answers Relations
patient.hasMany(questions,{sourceKey: 'id', foreignKey: 'patientId'})
questions.belongsTo(patient,{  foreignKey: 'patientId', targetKey: 'id' });
questions.hasMany(answers, { sourceKey: 'id', foreignKey: 'questionId' });
answers.belongsTo(questions,{foreignKey : 'questionId', targetKey: 'id'})
doctor.hasOne(answers, {foreignKey: 'doctorId' })
// answers.belongsTo(doctor,{ foreignKey: 'answerId', targetKey: 'id' });

patient.hasMany(book,{sourceKey: 'id', foreignKey: 'patientId'})
book.belongsTo(patient,{foreignKey: 'patientId', targetKey: 'id'});

doctor.hasMany(book,{sourceKey: 'id', foreignKey: 'doctorId'})
book.belongsTo(doctor,{foreignKey: 'doctorId', targetKey: 'id'});

const patientCollection = new collections(patient);
const doctorCollection = new collections(doctor);
const managerCollection = new collections(manager);
const patientInfoCollection = new collections(patientInfo);
const patientMedicalCollection = new collections(patientMedicalInfo);
const roleCollection = new collections(role);
const prescriptionCollection = new collections(prescription);
const answersCollection = new collections(answers);
const questionsCollection = new collections(questions);
const bookingCollection = new collections(book)
const departmentCollection = new collections(department)


module.exports = {
    db: sequelize,
    patient: patient,
    doctor: doctor,
    Patient: patientCollection,
    PatientInfo: patientInfoCollection,
    patientInfos: patientInfo,
    PatientMedicalInfo: patientMedicalCollection,
    PrescriptionInfo: prescriptionCollection,
    prescriptioninfo: prescription,
    patientMedicalInfos: patientMedicalInfo,
    Doctor: doctorCollection,
    Manager: managerCollection,
    manager: manager,
    Role: role,
    RoleCoo: roleCollection,
    answers : answersCollection,
    questions : questionsCollection,
    Book :bookingCollection,
    book :book,
    Department : departmentCollection,
    department : department
}
