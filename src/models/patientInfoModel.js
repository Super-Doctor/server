


const patientInfoModel=(sequelize,DataTypes)=>sequelize.define('patientInfo',{
  // id:{
  //   type:DataTypes.INTEGER,
  //   allowNull:false,
  //   primaryKey: true

  // },
  
    patientId: {
        type:DataTypes.STRING,
        allowNull:false,
        // primaryKey: true
      },
    
      address: {
        type:DataTypes.STRING,
        allowNull:false,
      },

      phoneNumber: {
        type:DataTypes.INTEGER,
        allowNull:false,
      },

      secondaryNumber: {
        type:DataTypes.INTEGER,
        allowNull:false,
      },

      medicalHistory : {
        type : DataTypes.STRING,
      }
  });
  module.exports = patientInfoModel;