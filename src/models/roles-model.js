'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const SECRET = process.env.SECRET;

const rolesModel = (sequelize, DataTypes) => sequelize.define('roles', {

    role: {
        type: DataTypes.STRING,
        allowNull : false
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
 
    capabilities: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                patient: ['read', 'create','update-medicalRecord','delete-medicalRecord', 'ask'],
                doctor: ['read','read-medicalinfo','update-medicalRecord','delete-medicalRecord', 'answer', 'create-prescription', 'update-prescription','delete-presecription', 'update'],
                manager: ['read', 'create','update-manager', 'delete-manager', 'update-doctor','update-patient','delete-doctor','delete-patient'],
            };

            return acl[this.role]
        }
    }

})

module.exports = rolesModel;