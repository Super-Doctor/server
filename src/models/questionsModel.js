'use strict';


const QuestionModel =  (sequelize, DataTypes) =>  sequelize.define('Questions',{
questionText :{
    type : DataTypes.STRING,
    allowNull : false
},

questionId : {
    type : DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
},

patientId:{
    type: DataTypes.STRING,
    allowNull: false,
},

})
module.exports = QuestionModel;