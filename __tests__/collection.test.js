"use strict";

const { patient } = require("../src/models/index");
const { doctor } = require("../src/models/index");
// const {  } = require("../src/models/index");

const DataCollection = require("../src/models/library/collection");

const {book}=require('../src/models/index')

let newCollection = new DataCollection(book)

/*
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
        },

        time: {
            type: DataTypes.STRING,
            allowNull: false
        },

       
        patientId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        doctorId:{

            type: DataTypes.STRING,
            allowNull: false,
        }
*/


describe("model collections ", () => {
  it('create method',async()=>{
    let myObj = {
      id:'500',
    patientName: 'Mamoun',

    Date: '2022-10-10',

    time: '14:00 P.M',

   
    patientId:77,

    doctorId:22
    }

    let result = await newCollection.create(myObj)

    expect(typeof result).toBe('object')
  })
  it('get method',async()=>{
    let result = await newCollection.get('500')

    expect(typeof result).toBe('object')
  })
  it('get method',async()=>{
    let result = await newCollection.get()

    expect(typeof result).toBe('object')
  })
  it('update method',async()=>{

    let myObj = {
      id:'500',
    patientName: 'Mamoun',

    Date: '2022-10-10',

    time: '14:00 P.M',

   
    patientId:77,

    doctorId:22
    }
    let result = await newCollection.update('500',myObj)

    expect(typeof result).toBe('object')
  })
  it('destroy method',async()=>{
    let result = await newCollection.delete('500')

    expect(typeof result).toBe('number')
  })
  
  it("patient", () => {
    let model = "Ali";
    let patient = new DataCollection(model);
    expect(patient.model).toEqual(model);
    expect(patient).toBeInstanceOf(DataCollection);
  });

    it("doctor", () => {
      let model = "dr.mohammd";
      let doctor = new DataCollection(model);
      expect(doctor.model).toEqual(model);
      expect(doctor).toBeInstanceOf(DataCollection);
    });
    it("manager", () => {
      let model = "dr.mohammd";
      let Manager = new DataCollection(model);
      expect(Manager.model).toEqual(model);
      expect(Manager).toBeInstanceOf(DataCollection);
    });

    it("Book", () => {
      let model = "dr.mohammd";
      let Book = new DataCollection(model);
      expect(Book.model).toEqual(model);
      expect(Book).toBeInstanceOf(DataCollection);
    });
   it("Role", () => {
      let model = "dr.mohammd";
      let Role = new DataCollection(model);
      expect(Role.model).toEqual(model);
      expect(Role).toBeInstanceOf(DataCollection);
    });
    it("PatientInfo", () => {
      let model = "dr.mohammd";
      let PatientInfo = new DataCollection(model);
      expect(PatientInfo.model).toEqual(model);
      expect(PatientInfo).toBeInstanceOf(DataCollection);
    });
    it("PatientMedicalInfo", () => {
      let model = "dr.mohammd";
      let PatientMedicalInfo = new DataCollection(model);
      expect(PatientMedicalInfo.model).toEqual(model);
      expect(PatientMedicalInfo).toBeInstanceOf(DataCollection);
    });
    it("PrescriptionInfo", () => {
      let model = "dr.mohammd";
      let PrescriptionInfo = new DataCollection(model);
      expect(PrescriptionInfo.model).toEqual(model);
      expect(PrescriptionInfo).toBeInstanceOf(DataCollection);
    });
    it("Role", () => {
      let model = "dr.mohammd";
      let answers = new DataCollection(model);
      expect(answers.model).toEqual(model);
      expect(answers).toBeInstanceOf(DataCollection);
    });
    it("questions", () => {
      let model = "dr.mohammd";
      let questions = new DataCollection(model);
      expect(questions.model).toEqual(model);
      expect(questions).toBeInstanceOf(DataCollection);
    });
})









// const { userModel } = require("../src/auth/models");
// const DataCollection = require("../src/models/library/collection");

// describe("collection ", () => {
//   it("constructor()", () => {
//     let model = "my name is ahmad";
//     let customer = new Collection(model);
//     expect(customer.model).toEqual(model);
//     expect(customer).toBeInstanceOf(Collection);
//   });
