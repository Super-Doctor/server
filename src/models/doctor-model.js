'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const SECRET = process.env.SECRET;

const doctorsModel = (sequelize, DataTypes) => {
    const doctorModel = sequelize.define('doctors', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        departmentId:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        


        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ userName: this.userName }, SECRET)
            },
            set(tokenObject) {
                let token = jwt.sign(tokenObject, SECRET);
                return token;
            }
        },


        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }


    });

    doctorModel.beforeCreate(async (doctor) => {
        let hashedPassword = await bcrypt.hash(doctor.password, 10);
        doctor.password = hashedPassword;
        let id = uuid();
        doctor.id = id;
    });

    doctorModel.authenticateBasic = async function (userName, password) {
        const doctor = await this.findOne({ where: { userName } });
        const valid = await bcrypt.compare(password, doctor.password);

        if (valid) {
            return doctor;
        }

        throw new Error("Invalid doctor");
    }

    doctorModel.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, SECRET);
            const doctor = await this.findOne({ where: { userName: parsedToken.userName } });
            if (doctor) {
                return doctor;
            }
            throw new Error('doctor Not Found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    return doctorModel;
}

module.exports = doctorsModel;