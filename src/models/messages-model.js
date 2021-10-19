'use strict';


const MessagesModel = (sequelize, DataTypes) => sequelize.define('Messages', {

 
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },

    reciverId: {
        type: DataTypes.STRING,
        allowNull: false,
      

    },

    reciverName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    senderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    senderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    // id: {
    //     type: DataTypes.STRING,

    // },

})
module.exports = MessagesModel;