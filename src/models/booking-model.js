'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const SECRET = process.env.SECRET;
const bookingsModel = (sequelize, DataTypes) => {
    const bookingModel = sequelize.define('book', {
// const bookingsModel = (sequelize, DataTypes) => sequelize.define('book', {

        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        patientName: {
            type: DataTypes.STRING,
        },

        Date: {
            type: DataTypes.STRING,
            allowNull: false,
            //December 25, 2021 03:30:00
        },

        // time: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },

       
        patientId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        doctorId:{

            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    bookingModel.beforeCreate(async (booking) => {
    
        let id = uuid();
        booking.id = id;

        let todayDate=new Date();
        // console.log('today datee',todayDate);

        let bookingDate=new Date(booking.Date)
        // console.log('booking date',bookingDate);

       

        if (bookingDate >= todayDate){
            let bookInfo=await bookingModel.findAll();
            bookInfo.map(book=>{
                if(bookingDate.getTime()==(new Date( book.Date)).getTime()){
                    throw new Error("Invalid date");
                }
                console.log('date',book.Date);
            })

            return booking;
        }
        throw new Error("Invalid date");
    });

    
    return bookingModel;
}

module.exports = bookingsModel; 
      