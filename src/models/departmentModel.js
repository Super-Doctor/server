const departmentModel = (sequelize, DataTypes) => sequelize.define('departmentModel', {
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,

    },

    departmentType:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phoneNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    workingHours:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    workingDays:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    leaderName:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

module.exports = departmentModel;
