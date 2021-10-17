// 'use strict';

// function  handle500 (req , res, next) {
//     const error = err.message ? err.message : err;
  
//     const errorObject = {
//       status: 500,
//       message: error
//     };
//     res.status(500).json(errorObject);
// }

// module.exports = handle500;


'use strict';

module.exports = (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: err.message,
    error:err,
    route: req.path,
  });
};