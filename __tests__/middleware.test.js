"use strict";
const { describe, beforeEach, afterEach } = require("@jest/globals");
const acl = require("../src/middlewares/acl");
const basic = require("../src/middlewares/basic-auth");
const bearer = require("../src/middlewares/bearer-auth");

describe("acl MiddleWare", () => {
  let mockVar;
  let mockRequest = {};
  let mockResponse = {};
  let nextFunction = jest.fn();
  beforeEach(() => {
    // mockVar = jest.spyOn(userModel, "findOne").mockImplementation();
    mockRequest = {
      headers:true,
    };
    mockResponse = {};
    //   json: jest.fn(),
    // };
  });
  // afterEach(() => {
  //   mockVar.mockRestore();
  // });
  it("acl", async () => {
    await acl(mockRequest, mockResponse, nextFunction());
    expect(nextFunction).toHaveBeenCalled();
  });
  // it("basic", async () => {
  //   let a =await basic(mockRequest, mockResponse, nextFunction());
  //   expect(nextFunction).toHaveBeenCalled();
  // });
  it("bearer", async () => {
    await bearer(mockRequest, mockResponse, nextFunction('error'));
    expect(nextFunction).toHaveBeenCalled();
  });
  
});