'use strict';

module.exports = (capability) => {

  return (req, res, next) => {
console.log(req.user);
    try {
      console.log('paaaaa',req.user);
      if (req.user.capabilities.includes(capability)) {
        console.log('Acl this student has capability to :', req.user.capabilities);
        next();
      }
      else {
        next('Access Denied');
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbmFAZ21haWwuY29tIiwiaWF0IjoxNjMxMTkzOTg4fQ.bAVL0Bag6C9fQrMkUJBQPajb8x2ZZxFuAz54ffUIAr4
      }
    } catch (e) {
      next('Invalid Loginbbb');
    }
  }
}