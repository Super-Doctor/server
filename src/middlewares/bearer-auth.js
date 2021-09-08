'use strict';

const { User } = require('../models/index');

module.exports =async (req, res, next) => {
    if (!req.headers.authorization) {
        return Error();
    }

    try {
        
        let token = req.headers.authorization.split(' ').pop();
        let validUser = await User.authenticateToken(token);
        console.log(validUser);
        req.user = validUser;
        req.token = validUser.token;

        next()
    } catch (e) {
        Error();
    }

      function Error() {
        next('Invalid Token');
      }
}