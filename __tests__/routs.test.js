'use strict';
const { server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);
describe('express server', () => {
  it('shoud check the Working... works successfully', async () => {
    //arange
    let param = '/';
    let status = 200;
    let text = 'Every Thing Is Working Good... :)';
    //act 
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
    expect(response.text).toBe(text);
  });
  it('shoud check 404 errors', async () => {
    //arange
    let param = '/notfound';
    let status = 404;
    //act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });

  let user = {
    userName: "Mariam1",
    email: "mariam33@gmail.com",
    password: "mariam3@gmail.com",
    roleId: 2
  };
  
//   it('test for creating a doctor in post method signup', async () => {
//     const response = await request.post('/signup/doctor').send(user);
//     expect(response.status).toBe(201);
//   });
  it('test for creating a patient in post method signup', async () => {
    const response = await request.post('/signup/patient').send(user);
    expect(response.status).toBe(500);
  });
  it('signin no access', async () => {
    const response = await request.get('/signin/doctor').auth('mariam@gmail.com', '123');
    expect(response.status).toBe(200);
  });
  it('test for get allpatients', async () => {
    const response = await request.get('/allpatients');
    expect(response.status).toBe(200);
  });
  it('test for get alldoctors', async () => {
    const response = await request.get('/alldoctors');
    expect(response.status).toBe(200);
  });
  it('test for get allmanagers', async () => {
    const response = await request.get('/allmanagers');
    expect(response.status).toBe(201);
  });




});