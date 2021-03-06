'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const SECRET = process.env.SECRET;

const doctorsModel = (sequelize, DataTypes) => {
    const doctorModel = sequelize.define('doctors', {
        doctorName: {
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

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },


        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ doctorName: this.doctorName }, SECRET)
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

    doctorModel.authenticateBasic = async function (email, password) {
        const doctor = await this.findOne({ where: { email } });
        const valid = await bcrypt.compare(password, doctor.password);

        if (valid) {
            return doctor;
        }

        throw new Error("Invalid doctor");
    }

    doctorModel.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, SECRET);
            const doctor = await this.findOne({ where: { email: parsedToken.email } });
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