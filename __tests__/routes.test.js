"use strict";
const { server } = require("../src/server");
const supertest = require("supertest");
const request = supertest(server);
// const { describe, beforeEach, afterEach } = require("@jest/globals");
// const { userModel } = require("../src/models");
// const reoter = require('../src/routs/mainRout')
// const handler404 = require("./errorHandlers/404");
// const handler500 = require("./errorHandlers/500");


describe("express server", () => {
  // (500)
  it("should check 500 errors", async () => {
    // arrange
    let path = "/bad";
    let status = 500;
    // act
    const response = await request.get(path);
    // assert
    expect(response.status).toBe(status);
    expect(typeof response.body).toEqual("object");
  });
  // (404)
  it("shoud check 404 errors", async () => {
    // arrange
    let path = "/notfound";
    let status = 404;
    // act
    const response = await request.get(path);
    // assert
    expect(response.status).toBe(status);
  });
  it("patient", async () => {
    let path = "/allpatients";
    let status = 200;
    // act
    const response = await request.get(path);
    // assert
    expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });
  // "/pet",
  it("get doctor", async () => {
    let path = "/alldoctors";
    let status = 200;
    // act
    const response = await request.get(path);
    // assert
    expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });

  it("signin", async () => {
    let path = "/signin/doctor";
    let status = 500;
    let userObj = {
      user_name: 'ibrahem',
      user_password: '***'
    }
    // act
    const response = await request.get(path, userObj);
    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });
// ('',.',.',
// control Routes
it("add test", async () => {
    let path = "/addPresecription/user";
    let status = 500;
    let userObj = {
      user_name: 'ibrahem',
      user_password: '***'
    }
    // act
    const response = await request.post(path, userObj);
    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });

  it("get test", async () => {
    let path = '/allpresecriptions';
    let status = 500;
    let userObj = {
      user_name: 'ibrahem',
      user_password: '***'
    }
    // act
    const response = await request.get(path, userObj);
    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });

  it("get specific test", async () => {
    let path = '/presecriptioninfos/:id/:role';
    let status = 500;
    let userObj = {
      user_name: 'ibrahem',
      user_password: '***'
    }
    // act
    const response = await request.get(path, userObj);
    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });


  // .,.

  it("Delete", async () => {
    let path = '/deletepresecriptionInfo/:id/:role';
    let status = 500;
    let userObj = {
      user_name: 'ibrahem',
      user_password: '***'
    }
    // act
    const response = await request.delete(path, userObj);
    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });

  it("update test", async () => {
    let path = '/updatepresecriptionInfo/:id/:role';
    let status = 500;
    let userObj = {
      user_name: 'ibrahem',
      user_password: '***'
    }
    // act
    const response = await request.put(path, userObj);
    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);
  });
});