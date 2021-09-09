'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize,DataTypes } = require('sequelize');
const SECRET = process.env.SECRET || "my_secret";

const patientsModel = (sequelize, DataTypes) => {
    const patientModel = sequelize.define('patients', {
        id:{
            type: DataTypes.STRING,
            // allowNull: false,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ email: this.email }, SECRET)
            },
            set(tokenObject) {
                let token = jwt.sign(tokenObject, SECRET);
                return token;
            }
        },

      
        roleId : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        
        doctorId : {
            type: DataTypes.STRING,
            allowNull: false,
            // foreignKey: true,
            // references : {
            //     model : 'doctors',
            //     key : 'id'
            // }

        }
        

    });

    patientModel.beforeCreate(async (patient) => {
        let hashedPassword = await bcrypt.hash(patient.password, 10);
        patient.password = hashedPassword;
        let id = uuid();
        patient.id = id;
    });

    patientModel.authenticateBasic = async function (email, password) {
console.log('authenticateBasic');
        const patient = await this.findOne({ where: { email:email } });
        // console.log(patient);
        const valid = await bcrypt.compare(password, patient.password);

        if (valid) {
            return patient;
        }

        throw new Error("Invalid patient");
    }

    patientModel.authenticateToken = async function  (token) {
        try{
            const parsedToken = jwt.verify(token , SECRET);
            const patient = await this.findOne({where : {email : parsedToken.email}});
            if(patient){
                return patient;
            }
            throw new Error('patient Not Found');
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    return patientModel;
}

module.exports = patientsModel;