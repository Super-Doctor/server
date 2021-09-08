const patientMedicalModel = (sequelize, DataTypes) => sequelize.define('patientMedicalInfo', {

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

    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }


});
module.exports = patientMedicalModel;