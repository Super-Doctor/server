


"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");
// Postgres
// MySQL
const { describe, beforeAll, afterAll } = require("@jest/globals");
const userModel = require("../src/models/patient-model");
const sequelize = new Sequelize(
  "postgres://postgres:0000@localhost:5432/tests"
);
const Users = userModel(sequelize, DataTypes);
beforeAll(async () => {
  await sequelize.sync();
});
describe("Bearer Auth", () => {
  let userInfo = {
    userName: "Test User",
    email:"mamoune2423",
    password: "123",
    roleId:1
  };
  it("should create a user with a hashed password", async () => {
    // arrange
    // act
    let user = await Users.create(userInfo);
    let isValid = await bcrypt.compare(
      userInfo.password,
      user.password
    );
    // assert
    expect(user.id).toBeTruthy();
    //check user name and password
    expect(isValid).toBeTruthy();
  });
  it("should attach a teken on find", async () => {
    //arrange
    //act
    let user = await Users.findOne({ where: { email:userInfo.email }});
    let decodedJwt = jwt.decode(user.token);
    // assert
    expect(user.userName).toEqual(userInfo.userName);
    expect(user.token).toBeTruthy();
    expect(decodedJwt.email).toEqual(userInfo.email);
  });
});
afterAll(() => {
  sequelize.drop();
});
const doctorModel = require("../src/models/doctor-model");
const doctors = doctorModel(sequelize, DataTypes);
beforeAll(async () => {
  await sequelize.sync();
});
describe("Bearer Auth", () => {
  let userInfo = {
    userName: "Test User",
    email:"mamoune2423",
    password: "123",
    roleId:2,
    departmentId:1

  };
  it("should create a user with a hashed password", async () => {
    // arrange
    // act
    let doctor = await doctors.create(userInfo);
    let isValid = await bcrypt.compare(
      userInfo.password,
      doctor.password
    );
    // assert
    expect(doctor.id).toBeTruthy();
    //check user name and password
    expect(isValid).toBeTruthy();
  });
  it("should attach a teken on find", async () => {
    //arrange
    //act
    let doctor = await doctors.findOne({ where: { email:userInfo.email }});
    let decodedJwt = jwt.decode(doctor.token);
    // assert
    expect(doctor.userName).toEqual(userInfo.userName);
    expect(doctor.token).toBeTruthy();
    expect(decodedJwt.email).toEqual(userInfo.email);
  });
});
afterAll(() => {
  sequelize.drop();
});





const mangerModel = require("../src/models/managerModel");
const mangers = mangerModel(sequelize, DataTypes);
beforeAll(async () => {
  await sequelize.sync();
});
describe("Bearer Auth", () => {
  let userInfo = {
    userName: "Test User",
    email:"mamoune2423",
    password: "123",
    roleId:3,
    

  };
  it("should create a user with a hashed password", async () => {
    // arrange
    // act
    let manger = await mangers.create(userInfo);
    let isValid = await bcrypt.compare(
      userInfo.password,
      manger.password
    );
    // assert
    expect(manger.email).toBeTruthy();
    //check user name and password
    expect(isValid).toBeTruthy();
  });
  it("should attach a teken on find", async () => {
    //arrange
    //act
    let manger = await mangers.findOne({ where: { email:userInfo.email }});
    let decodedJwt = jwt.decode(manger.token);
    // assert
    expect(manger.userName).toEqual(userInfo.userName);
    expect(manger.token).toBeTruthy();
    expect(decodedJwt.email).toEqual(userInfo.email);
  });
});
afterAll(() => {
  sequelize.drop();
});
// Postgres
// MySQL
// const doctorModel = require("../src/models/doctor-model");
// const sequelize = new Sequelize(
//   "postgres://postgres:0000@localhost:5432/tests"
// );
