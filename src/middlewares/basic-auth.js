'use strict';

const base64 = require('base-64');
const { doctor, patient, Role } = require('../models/index');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization)
     {
        next('invalid login')
        return ;
    }

    let basic = req.headers.authorization.split(' ').pop();
    let [email, password] = base64.decode(basic).split(':');

        try {

        if(await patient.authenticateBasic(email, password)){
            const user = await patient.authenticateBasic(email, password);

            const capability = await Role.findOne({ where: { id: user.roleId } });
            const capabilities = capability.capabilities;
            req.user = {
                user,
                capabilities
            }

            // req.user = await patient.authenticateBasic(email, password );


            next();}
        } catch (e) {
        
        try {
if(await doctor.authenticateBasic(email, password)){
            const user = await doctor.authenticateBasic(email, password);
            const capability = await Role.findOne({ where: { id: user.roleId } })
            const capabilities = capability.capabilities
            req.user = {
                user,
                capabilities
            }
            // req.user = await doctor.authenticateBasic(email, password );



            next();}
        } catch (e) {
            Error()
        }
        }


    function Error() {
        next('Invalid Login');
    }

}