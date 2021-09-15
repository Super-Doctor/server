'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const SECRET = process.env.SECRET;
const bookingsModel = (sequelize, DataTypes) => sequelize.define('book', {

        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        patientName: {
            type: DataTypes.STRING,
        },

        Date: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },

        time: {
            type: DataTypes.STRING,
            allowNull: false
        },

       
        patientId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        doctorId:{

            type: DataTypes.STRING,
            allowNull: false,
        }
    })

module.exports = bookingsModel; 
      