'use strict';

require('dotenv').config();

const {Sequelize , DataTypes} = require('sequelize');

const patientModel = require('./patient-model');
const doctorModel = require('./doctor-model');
const roleModel = require('./roles-model');

const SQL_DATABASE_URL = process.env.SQL_DATABASE_URL;

const sequelize = new Sequelize (SQL_DATABASE_URL, {});

const patient = patientModel(sequelize , DataTypes);
const doctor = doctorModel(sequelize, DataTypes);
const role = roleModel(sequelize, DataTypes);

// To create the relations
doctor.hasMany(patient, { sourceKey: 'id', foreignKey: 'doctorId' });
patient.belongsTo(doctor, { foreignKey: 'doctorId', targetKey: 'id' });

module.exports = {
    db : sequelize,
    Patient : patient,
    Doctor : doctor
}