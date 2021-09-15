"use strict";
const { server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe("test status 500 & 404 ", () => {
    // bad route
    it("handles Not found 404 error", async () => {
      const response = await request.get("/requestNotFound");
      expect(response.status).toEqual(404);
    });
  
    // bad method
    it("handles 500 status internal error", async () => {
      const response = await request.get("/bad");
      expect(response.status).toEqual(500);
    });
  
    it('should get a welcome message', async () => {
      //arrange
      // let route = '/';
      //act
      const response = await request.get('/');
      //assert
      expect(response.status).toBe(200);
      expect(response.text).toBe('Every Thing Is Working Good... :)');
    });


    it('should get an error', async () => {
      const response = await request.get('/home');
      expect(response.status).toEqual(200);
    });
    // it('should get an error', async () => {
    //   const response = await request.get('/signup/patient');
    //   expect(response.status).toEqual(200);
    // });
  });
  
  





  
