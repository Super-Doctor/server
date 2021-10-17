
"use strict";

const loggerMiddleware = require("../src/middlewares/logger");

describe("Logger Middelware Test", () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("properly logs some output", () => {
    loggerMiddleware(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("moves to the next", () => {
    loggerMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});