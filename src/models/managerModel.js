'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const SECRET = process.env.SECRET;

const managersModel = (sequelize, DataTypes) => {
    const managerModel = sequelize.define('managers', {
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


        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }


    });

    managerModel.beforeCreate(async (manager) => {
        let hashedPassword = await bcrypt.hash(manager.password, 10);
        manager.password = hashedPassword;
        let id = uuid();
        manager.id = id;
    });

    managerModel.authenticateBasic = async function (email, password) {
        const manager = await this.findOne({ where: { email } });
        const valid = await bcrypt.compare(password, manager.password);

        if (valid) {
            return manager;
        }

        throw new Error("Invalid manager");
    }

    managerModel.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, SECRET);
            const manager = await this.findOne({ where: { email: parsedToken.email } });
            if (manager) {
                return manager;
            }
            throw new Error('manager Not Found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    return managerModel;
}

module.exports = managersModel;