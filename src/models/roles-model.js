'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize/types');
const SECRET = process.env.SECRET;

const rolesModel = (sequelize, DataTypes) => sequelize.define('roles', {

    role: {
        type: DataTypes.STRING,
        allowNull : false
    },
 
    capabilities: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                patient: ['read', 'create'],
                doctor: ['read', 'answer', 'create-prescription', 'update-prescription', 'update'],
                manager: ['read', 'create', 'delete', 'update'],
            };

            return acl[this.role]
        }
    }

})

module.exports = rolesModel;