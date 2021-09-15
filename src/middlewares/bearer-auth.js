'use strict';

const { doctor, patient,Role,manager  } = require('../models/index');

module.exports =async (req, res, next) => {
    if (!req.headers.authorization) {
        return Error();
    }
    let token = req.headers.authorization.split(' ').pop();
if(req.params.role=='patient'){
    try {
        let validUser = await patient.authenticateToken(token);
        
        
        req.user = validUser;
        req.token = validUser.token;
        // console.log('valid userrr',validUser);
        const capability= await Role.findOne({where: {id :validUser.roleId }})
        const capabilities=capability.capabilities
        req.user={
            validUser,
            capabilities
        }

        next()}
        catch (e) {
            Error();
        }
    }    

        else if(req.params.role=='doctor'){
            try  {
            let validUser = await doctor.authenticateToken(token);

            req.user = validUser;
            req.token = validUser.token;
            // console.log('valid userrr',validUser);
            const capability= await Role.findOne({where: {id :validUser.roleId }})
            const capabilities=capability.capabilities
            req.user={
                validUser,
                capabilities
            }
    
            next()
        }
     catch (e) {
        Error();
    }}
    else if(req.params.role=='manager'){
        try  {
        let validUser = await manager.authenticateToken(token);

        req.user = validUser;
        req.token = validUser.token;
        // console.log('valid userrr',validUser);
        const capability= await Role.findOne({where: {id :validUser.roleId }})
        const capabilities=capability.capabilities
        req.user={
            validUser,
            capabilities
        }

        next()
    }
 catch (e) {
    Error();
}}

      function Error() {
        next('Invalid Token');
      }
}