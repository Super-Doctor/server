'use strict';

const base64 = require('base-64');
const { User } = require('../models/index');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return Error();
    }

    let basic = req.headers.authorization.split(' ').pop();
    let [email, password] = base64.decode(basic).split(':');
    
    try {
        req.user = await User.authenticateBasic(email, password );
        next();
    } catch (e) {
        Error()
    }

    function Error() {
        next('Invalid Login');
      }
    
}