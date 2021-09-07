const patientInfoModel=(sequelize,DataTypes)=>sequelize.define('patientInfo',{
    id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true

      },
       name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    
    
      address: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      phoneNumber: {
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      patientsHistory: {
        type:DataTypes.STRING,
        allowNull:false,
      },

   
  });
  module.exports = patientInfoModel;