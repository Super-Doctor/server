'use strict';

const presecriptionsModel = (sequelize, DataTypes) =>  sequelize.define('presecriptions', {
        // id: {
        //     type: DataTypes.STRING,
        //     primaryKey: true
        // },
        title: {
            type: DataTypes.STRING,
        },

        description: {
            type: DataTypes.STRING,
            // allowNull: false,
        },

        pharmaceutical: {
            type: DataTypes.STRING,
            // allowNull: false
        },

        

        doctorName : {
            type: DataTypes.STRING,
            allowNull: false,
        },

        doctorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },


        patientId : {
            type: DataTypes.STRING,
            allowNull: false,
        }

});

 

module.exports = presecriptionsModel;