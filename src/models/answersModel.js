'use strict';


const AnwsersModel = (sequelize, DataTypes) => sequelize.define('Answers', {
    answerText: {
        type: DataTypes.STRING,
        allowNull: false
    },

    questionId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,

    },

    doctorId: {
        type: DataTypes.STRING,
    },
    
    answerId: {
        type: DataTypes.STRING,

    },

})
module.exports = AnwsersModel;