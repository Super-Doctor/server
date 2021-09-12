const patientMedicalModel = (sequelize, DataTypes) => sequelize.define('patientMedicalInfo', {
    // id:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,

    // },

    checkInDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    checkOutDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    medicalCase: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    doctorName : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    doctorReport : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    doctorId : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    patientId: {
        type: DataTypes.STRING,
        allowNull: false,
    }


});
module.exports = patientMedicalModel;