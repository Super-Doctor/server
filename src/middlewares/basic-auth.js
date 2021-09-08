'use strict';

const base64 = require('base-64');
const { Doctor, Patient } = require('../models/index');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return Error();
    }

    let basic = req.headers.authorization.split(' ').pop();
    let [email, password] = base64.decode(basic).split(':');
    console.log(email);
    try {
        console.log(';ccccc',email);
        req.patient = await Patient.authenticateBasic(email, password );
        console.log(';cccggggggggggggcc',email);

        next();
    } catch (e) {
        Error()
    }

    function Error() {
        next('Invalid Login');
      }
    
}