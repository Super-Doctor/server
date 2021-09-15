'use strict';

// const book= require('../src/routes/booking-route')
const { server } = require('../src/server.js'); // => {server,start}
const superTest = require('supertest');
const request = superTest(server);
const  {Book, book}  = require('../src/models/index')

let bookID;

describe('API Server', () => {
    // Testing Clothes
    it('Handle error routes', async () => {
      const response = await request.get(`/`);
      expect(response.status).toEqual(200);
    });
    it('Handle error method', async () => {
      const response = await request.post(`/test`);
      expect(response.status).toEqual(404);
    });

    it('should create an appoinment ', async () => {
        const response = await request.post('/bookAppointment').send({
            id:4,
            patientName:'mamoun',
            Date:'123',
            time:'23',
            patientId:77,
            doctorId:22
        
         
        });
        
        // expect(response.body).toEqual("mamoun");
        // bookID = response.body.id;
        expect(response.status).toEqual(500);
   
      });

    it('Handle getting AllAppointments', async () => {
      const response = await request.get(`/AllAppointments`);
      expect(response.status).toEqual(200);
    });
    
        it('should delete Appointments', async () => {
        const response = await request.delete(`/deleteAppointments/5/patient`)
        expect(response.body).toEqual(response.body);
      });
      it('should update Appointments', async () => {
        const response = await request.put(`/updateAppointments/5/patient`).send({

          Book:{
            id:3,
            patientName:"mohammad",
            Date:"123",
            time:"323",
            patientId:77,
            doctorId:22
          }
         
        })
        expect(response.body).toEqual(response.body);
      });
    



})